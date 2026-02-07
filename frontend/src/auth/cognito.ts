/**
 * AWS Cognito 认证工具
 * 
 * 封装 Cognito 用户池的登录、登出、令牌管理等功能
 */

import { UserManager, User, WebStorageStateStore } from 'oidc-client-ts';

// 从环境变量读取配置
const COGNITO_USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID || '';
const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID || '';
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN || '';
const AWS_REGION = import.meta.env.VITE_AWS_REGION || 'us-east-1';
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// 🎯 动态回调 URL - 根据当前域名自动适配
const getBaseUrl = () => {
  const origin = window.location.origin;
  const base = import.meta.env.BASE_URL || '/';
  return `${origin}${base.endsWith('/') ? base.slice(0, -1) : base}`;
};

const BASE_URL = getBaseUrl();
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || `${BASE_URL}/callback`;
const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI || BASE_URL;
const SILENT_REDIRECT_URI = import.meta.env.VITE_SILENT_REDIRECT_URI || `${BASE_URL}/silent-renew.html`;

// 构造 Cognito OIDC 配置
const authority = COGNITO_DOMAIN || `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;

const oidcConfig = {
  authority,
  client_id: COGNITO_CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  post_logout_redirect_uri: LOGOUT_URI,
  response_type: 'code',
  scope: 'openid profile email',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  silent_redirect_uri: SILENT_REDIRECT_URI,
};

// 模拟用户对象
const MOCK_USER = {
  id_token: "mock-id-token",
  access_token: "mock-access-token",
  scope: "openid profile email",
  token_type: "Bearer",
  profile: {
    sub: "mock-user-id",
    email: "dev@local",
    name: "Developer",
    email_verified: true,
    iss: "mock-issuer",
    aud: "mock-client",
    exp: Date.now() / 1000 + 86400,
    iat: Date.now() / 1000,
  },
  expires_at: Date.now() / 1000 + 86400,
  expired: false,
} as unknown as User;

// 创建 UserManager 实例
let userManager: UserManager | null = null;

export function getUserManager(): UserManager {
  if (!userManager) {
    if ((!COGNITO_CLIENT_ID || !COGNITO_USER_POOL_ID) && !USE_MOCK_AUTH) {
      console.warn('[Auth] Cognito 配置缺失，认证功能将不可用');
    }
    userManager = new UserManager(oidcConfig);
  }
  return userManager;
}

/**
 * 跳转到登录页面
 */
export async function login(): Promise<void> {
  if (USE_MOCK_AUTH) {
    // 模拟登录：在 LocalStorage 存入标记，然后刷新页面
    console.log('[Auth] Mock Login triggered');
    localStorage.setItem('mock_auth_user', JSON.stringify(MOCK_USER));
    window.location.reload(); // 简单粗暴，刷新让 AuthContext 重新读取
    return;
  }
  const manager = getUserManager();
  await manager.signinRedirect({
    state: { returnUrl: window.location.pathname }
  });
}

/**
 * 处理登录回调
 */
export async function handleLoginCallback(): Promise<User | null> {
  if (USE_MOCK_AUTH) return getMockUser();

  const manager = getUserManager();
  try {
    const user = await manager.signinRedirectCallback();
    console.log('[Auth] Login successful:', user.profile);
    return user;
  } catch (error) {
    console.error('[Auth] Login callback error:', error);
    throw error;
  }
}

/**
 * 登出
 */
export async function logout(): Promise<void> {
  if (USE_MOCK_AUTH) {
    localStorage.removeItem('mock_auth_user');
    window.location.href = '/';
    return;
  }
  const manager = getUserManager();
  await manager.signoutRedirect();
}

function getMockUser(): User | null {
  const stored = localStorage.getItem('mock_auth_user');
  if (stored) {
    return JSON.parse(stored) as User;
  }
  return null;
}

/**
 * 获取当前用户
 */
export async function getUser(): Promise<User | null> {
  if (USE_MOCK_AUTH) return getMockUser();

  const manager = getUserManager();
  return await manager.getUser();
}

/**
 * 检查用户是否已登录
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return user !== null && !user.expired;
}

/**
 * 获取访问令牌
 */
export async function getAccessToken(): Promise<string | null> {
  const user = await getUser();
  return user?.access_token || null;
}

/**
 * 获取 API Token
 */
export async function getApiToken(): Promise<string | null> {
  const user = await getUser();
  if (user?.id_token) return user.id_token;
  if (user?.access_token) return user.access_token;
  return null;
}

/**
 * 获取 ID 令牌
 */
export async function getIdToken(): Promise<string | null> {
  const user = await getUser();
  return user?.id_token || null;
}

/**
 * 静默刷新令牌
 */
export async function renewToken(): Promise<User | null> {
  if (USE_MOCK_AUTH) return getMockUser();

  const manager = getUserManager();
  try {
    const user = await manager.signinSilent();
    return user;
  } catch (error) {
    return null;
  }
}

/**
 * 移除用户会话
 */
export async function removeUser(): Promise<void> {
  if (USE_MOCK_AUTH) {
    localStorage.removeItem('mock_auth_user');
    return;
  }
  const manager = getUserManager();
  await manager.removeUser();
}


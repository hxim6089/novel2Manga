# Novel-to-Comics AI Platform (Java Local Version)

小说转漫画 AI 平台 - 纯本地运行版本

## 技术栈
- **后端**: Spring Boot 3 + Java 17
- **数据库**: H2 (本地文件存储)
- **AI 服务**: 阿里千问 (Qwen) + Google Imagen

## 快速开始

### 1. 运行后端
```bash
cd backend-local
mvn spring-boot:run
```
- API: http://localhost:9000
- H2 控制台: http://localhost:9000/h2-console (用户名: `sa`)

### 2. 配置 AI 密钥
访问 http://localhost:9000/settings 或编辑 `application.yml`

## 项目结构
```
backend-local/
├── src/main/java/com/qnyproj/
│   ├── model/          # JPA 实体
│   ├── repository/     # 数据访问层
│   ├── service/        # 业务逻辑
│   │   └── ai/         # AI 服务 (Qwen, Imagen)
│   └── controller/     # REST API
└── src/main/resources/
    └── application.yml # 配置文件
```

## 主要功能
1. **小说上传与分析** - 使用千问 AI 提取角色和场景
2. **角色数据库 (Bible)** - 保持角色一致性
3. **分镜生成** - 自动生成漫画分镜
4. **图像生成** - 使用 Google Imagen 生成图片

## 作者
https://github.com/Steve84226

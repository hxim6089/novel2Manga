import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Typography, Space, Divider, Tag } from 'antd';
import { KeyOutlined, CloudOutlined, SaveOutlined, CheckCircleOutlined, GithubOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph, Link } = Typography;

interface ApiConfig {
    qwenApiKey: string;
    googleProjectId: string;
    googleLocation: string;
}

export function SettingsPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'saved'>('idle');

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const response = await fetch(`${API_BASE}/config`);
            if (response.ok) {
                const data = await response.json();
                form.setFieldsValue({
                    qwenApiKey: data.qwenApiKey || '',
                    googleProjectId: data.googleProjectId || '',
                    googleLocation: data.googleLocation || 'us-central1',
                });
            }
        } catch (error) {
            console.log('Config not available yet');
        }
    };

    const onFinish = async (values: ApiConfig) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/config`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('API 配置已保存！');
                setStatus('saved');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                message.error('保存失败，请重试');
            }
        } catch (error) {
            message.error('无法连接到后端服务');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <Title level={2}>
                <KeyOutlined /> 设置
            </Title>

            <Paragraph type="secondary">
                配置 AI 服务的 API 密钥。这些密钥用于小说分析和图像生成功能。
            </Paragraph>

            <Card
                title={
                    <Space>
                        <CloudOutlined />
                        <span>AI 服务配置</span>
                        {status === 'saved' && <Tag color="success" icon={<CheckCircleOutlined />}>已保存</Tag>}
                    </Space>
                }
                style={{ marginBottom: 24 }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        googleLocation: 'us-central1'
                    }}
                >
                    <Divider orientation="left">阿里云千问 (Qwen)</Divider>

                    <Form.Item
                        name="qwenApiKey"
                        label="Qwen API Key"
                        extra="用于文本分析和角色提取"
                        rules={[{ required: true, message: '请输入 Qwen API Key' }]}
                    >
                        <Input.Password
                            placeholder="sk-xxxxxxxxxxxxxxxx"
                            prefix={<KeyOutlined />}
                        />
                    </Form.Item>

                    <Divider orientation="left">Google Cloud (Imagen)</Divider>

                    <Form.Item
                        name="googleProjectId"
                        label="Google Cloud Project ID"
                        extra="Google Cloud 项目 ID"
                        rules={[{ required: true, message: '请输入 Project ID' }]}
                    >
                        <Input placeholder="my-project-123456" />
                    </Form.Item>

                    <Form.Item
                        name="googleLocation"
                        label="Location"
                        extra="Vertex AI 区域"
                    >
                        <Input placeholder="us-central1" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            icon={<SaveOutlined />}
                            size="large"
                        >
                            保存配置
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title={<Space><GithubOutlined /><span>项目信息</span></Space>}>
                <Space direction="vertical">
                    <Text>
                        <Text strong>GitHub 仓库: </Text>
                        <Link href="https://github.com/Steve84226" target="_blank">
                            https://github.com/Steve84226
                        </Link>
                    </Text>
                    <Text type="secondary">
                        Novel-to-Comics Platform - 小说转漫画 AI 平台
                    </Text>
                </Space>
            </Card>
        </div>
    );
}

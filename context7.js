const mcp = require('@iflow-mcp/context7-mcp@1.0.0');

// 1. 显式定义工具结构（让平台识别）
const tools = mcp.tools || [];

// 2. 暴露MCP服务的核心元数据（必填）
module.exports = {
  // 服务基本信息
  name: "context7-mcp",
  version: "1.0.0",
  // 工具列表（核心：让平台/Kiro识别）
  tools: tools.map(tool => ({
    name: tool.name,
    description: tool.description || "Context7 MCP Tool",
    parameters: tool.parameters || {},
    returns: tool.returns || "string"
  })),
  // 兼容FastMCP的启动入口
  start: () => mcp.start || (() => console.log("Context7 MCP started")),
  // 兼容工具调用
  callTool: (toolName, params) => {
    const tool = tools.find(t => t.name === toolName);
    return tool ? tool.execute(params) : Promise.reject(`Tool ${toolName} not found`);
  }
};

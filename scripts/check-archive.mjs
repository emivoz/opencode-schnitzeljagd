const endpoint = "https://banana.nohumanintheloop.dev/mcp/archive";

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    accept: "application/json, text/event-stream",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-11-25",
      capabilities: {},
      clientInfo: { name: "banana-split-check", version: "1.0.0" },
    },
  }),
});

const body = await response.text();
if (!response.ok || body.trimStart().startsWith("<!DOCTYPE html") || body.includes("<html")) {
  console.error(`Archive MCP check failed: HTTP ${response.status}`);
  console.error("The endpoint returned HTML or an HTTP error instead of MCP data.");
  console.error(`Endpoint: ${endpoint}`);
  process.exit(1);
}

if (!body.includes('"serverInfo"') || !body.includes('"banana-archive"')) {
  console.error("Archive MCP check failed: unexpected MCP initialize response.");
  console.error(`Endpoint: ${endpoint}`);
  process.exit(1);
}

console.log(`Archive MCP reachable: ${endpoint}`);

using Microsoft.AspNetCore.Mvc;

namespace backend.Llama;

public static class LlamaEndpoints
{
    public sealed record ChatRequest(string PromptId, string Message);

    public static IEndpointRouteBuilder MapLlamaEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/health", () => Results.Ok(new { status = "ok" }));

        endpoints.MapPost("/chat", async (
            [FromBody] ChatRequest req,
            [FromServices] ILlamaService llama,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(req.PromptId) || string.IsNullOrWhiteSpace(req.Message))
                return Results.BadRequest(new { error = "Body JSON required: { \"promptId\": \"...\", \"message\": \"...\" }" });

            var (text, usage) = await llama.GenerateFinalLineAsync(req.PromptId, req.Message, ct);

            return Results.Ok(new
            {
                response = text,
                inputTokens = usage.InputTokens,
                outputTokens = usage.OutputTokens,
                tokensConsumed = usage.TokensConsumed,
                tokensPerSecond = usage.TokensPerSecond,
                elapsedMs = usage.ElapsedMs
            });
        });

        endpoints.MapPost("/chat/split", async (
            [FromBody] ChatRequest req,
            [FromServices] ILlamaService llama,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(req.PromptId) || string.IsNullOrWhiteSpace(req.Message))
                return Results.BadRequest(new { error = "Body JSON required: { \"promptId\": \"...\", \"message\": \"...\" }" });

            var (reasoning, answer, usage) = await llama.GenerateWithReasoningAsync(req.PromptId, req.Message, ct);

            return Results.Ok(new
            {
                reasoning,
                answer,
                inputTokens = usage.InputTokens,
                outputTokens = usage.OutputTokens,
                tokensConsumed = usage.TokensConsumed,
                tokensPerSecond = usage.TokensPerSecond,
                elapsedMs = usage.ElapsedMs
            });
        });

        return endpoints;
    }
}
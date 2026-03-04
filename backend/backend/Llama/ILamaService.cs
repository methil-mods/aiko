namespace backend.Llama;

public interface ILlamaService
{
    Task<(string text, backend.Llama.LlamaService.UsageMetrics usage)> GenerateFinalLineAsync(
        string promptId,
        string userMessage,
        CancellationToken ct = default);

    IAsyncEnumerable<(string Token, string Response, backend.Llama.LlamaService.UsageMetrics Usage, bool Done)> StreamFinalAsync(
        string promptId,
        string userMessage,
        CancellationToken ct = default);

    Task<(string reasoning, string answer, backend.Llama.LlamaService.UsageMetrics totalUsage)> GenerateWithReasoningAsync(
        string promptId,
        string userMessage,
        CancellationToken ct = default);

    // Optionnel: compat
    Task<string> GenerateAsync(string userMessage, CancellationToken ct = default);
}
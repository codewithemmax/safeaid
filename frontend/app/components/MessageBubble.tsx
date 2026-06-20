import { Message } from "@/lib/types";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MessageBubble({ message }: { message: Message }) {
  const isOutbound = message.direction === "outbound";

  return (
    <div className={`flex ${isOutbound ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[78%] flex-col ${isOutbound ? "items-end" : "items-start"}`}
      >
        {message.isAiGenerated && (
          <span className="mb-1 inline-flex w-fit items-center gap-1 rounded-md border border-ai-border bg-ai-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ai-text">
            <span className="flex h-1 w-1 rounded-full bg-ai-text" />
            AI-drafted reply
          </span>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isOutbound
              ? "rounded-br-sm bg-brand text-white shadow-sm"
              : "rounded-bl-sm border border-border bg-surface-sunken text-text-primary"
          }`}
        >
          {message.body}
        </div>
        <span className="mt-1 px-1 text-[11px] text-text-muted">
          {isOutbound ? "SafeAid" : "Survivor"} · {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

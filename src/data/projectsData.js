export const PROJECTS = [
      {
        title: "WindMist v1.0.1 — Go AI CLI Agent",
        cat: "GenAI · Go 1.26",
        desc: "Open-source terminal coding assistant with Gemini 2.5 Pro (1M token context), Lip Gloss TUI, and <1.5ms atomic AST patching.",
        tags: ["Go 1.26", "Gemini 2.5 Pro", "Cobra CLI", "AST Patcher"],
        code: `// internal/agent/executor.go — Atomic Single-Pass Disk Write
func (e *PatchExecutor) CommitTransaction(ctx context.Context, tx *FileASTDiff) error {
    if err := e.verifySHA256Lock(tx.TargetPath, tx.ExpectedHash); err != nil {
        return err
    }
    return e.atomicWriteDisk(tx.TargetPath, tx.UnifiedBuffer)
}`,
        live: "https://windmist.vercel.app/",
        repo: "https://github.com/Nithwin/windmist",
        shape: 0
      },
      {
        title: "Kernel-Lab — C++20 Systems Lab",
        cat: "C++20 · OS Kernel",
        desc: "Low-level systems laboratory exploring 64-byte cache-aligned slab allocators, virtual page tables, and preemptive scheduling.",
        tags: ["C++20", "Slab Allocator", "OS Scheduling", "Linux"],
        code: `// include/kernel/slab_arena.hpp — Cache-Aligned C++20 Slab Arena
template <typename T, std::size_t Pages = 64>
class alignas(64) SlabArena {
public:
    [[nodiscard]] T* allocate() noexcept {
        if (!free_head_) expand_arena();
        return reinterpret_cast<T*>(std::exchange(free_head_, free_head_->next));
    }
};`,
        live: "https://github.com/Nithwin",
        repo: "https://github.com/Nithwin",
        shape: 1
      },
      {
        title: "Mini-Kafka — Distributed Log Broker",
        cat: "Distributed Go",
        desc: "High-throughput message broker with append-only segmented commit logs, sparse offset indexing, and consumer groups.",
        tags: ["Go", "Log Storage", "Zero-Copy", "Consumer Groups"],
        code: `// pkg/broker/segment.go — Segmented Commit Log Append
func (s *LogSegment) Append(record []byte) (uint64, error) {
    s.mu.Lock()
    defer s.mu.Unlock()
    offset := s.nextOffset
    _ = s.index.WriteEntry(offset, s.logFile.Position())
    _, err := s.logFile.Write(record)
    s.nextOffset++
    return offset, err
}`,
        live: "https://github.com/Nithwin",
        repo: "https://github.com/Nithwin",
        shape: 2
      },
      {
        title: "CA-YOLOv8 — Smart ID Detection",
        cat: "IEEE Xplore · Vision",
        desc: "Custom YOLOv8 architecture integrating Coordinate Attention (CA) and CBAM for real-time ID detection across 800 cards (0.58 EER).",
        tags: ["Python", "YOLOv8", "Coordinate Attention", "IEEE Xplore"],
        code: `# models/ca_yolov8.py — Coordinate Attention Block
class CoordinateAttention(nn.Module):
    def forward(self, x):
        x_h, x_w = self.pool_h(x), self.pool_w(x).permute(0, 1, 3, 2)
        y = self.act(self.bn1(self.conv1(torch.cat([x_h, x_w], dim=2))))
        x_h, x_w = torch.split(y, [x.size(2), x.size(3)], dim=2)
        return x * self.conv_h(x_h).sigmoid() * self.conv_w(x_w.permute(0,1,3,2)).sigmoid()`,
        live: "https://ieeexplore.ieee.org/iel8/11502027/11502031/11502277.pdf",
        repo: "https://github.com/Nithwin",
        shape: 3
      },
      {
        title: "ShadowCoders — Scalable Exam Engine",
        cat: "Full-Stack · 400+ Users",
        desc: "Real-time coding examination platform serving 400+ students with hybrid code execution and 11 browser anti-cheating guards.",
        tags: ["TypeScript", "Next.js", "PostgreSQL", "Socket.IO"],
        code: `// server/execution/hybridRunner.ts — Hybrid Code Sandbox
export async function executeSubmission(payload: Submission) {
  if (payload.supportsWasm && clusterLoad.p95 > 0.70) {
    return runClientWasmWorker(payload);
  }
  return runIsolatedContainer(payload, { timeoutMs: 2500 });
}`,
        live: "https://skills.rest/company/nithwin",
        repo: "https://github.com/Nithwin",
        shape: 0
      },
      {
        title: "DB-Crusher & POSIX TCP/IP Engine",
        cat: "Go & C++ Networking",
        desc: "High-concurrency database benchmark CLI with HDR p99 histograms paired with a raw Linux C++ TCP/IP socket chat server.",
        tags: ["Go", "C++", "POSIX Sockets", "p99 Benchmarks"],
        code: `// src/net/tcp_server.cpp — Scatter/Gather Socket Dispatch
ssize_t send_packet(int fd, uint16_t op, std::span<const uint8_t> data) {
    FrameHeader hdr{htons(op), htonl(static_cast<uint32_t>(data.size()))};
    struct iovec iov[2] = {{&hdr, sizeof(hdr)}, {const_cast<uint8_t*>(data.data()), data.size()}};
    return ::writev(fd, iov, 2);
}`,
        live: "https://github.com/Nithwin",
        repo: "https://github.com/Nithwin",
        shape: 1
      }
    ];

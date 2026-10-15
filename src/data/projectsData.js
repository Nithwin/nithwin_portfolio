export const PROJECTS = [
  {
    title: "WindMist v1.0.1 — Go AI CLI Agent",
    cat: "GenAI · Go 1.26",
    desc: "Open-source terminal coding assistant in Go with Gemini 2.5 Pro (1M token context), repository-aware AST patching, and Lip Gloss TUI.",
    tags: ["Go", "AI", "CLI", "Docker", "GitHub Actions"],
    imageUrl: "/assets/projects/windmist.webp",
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
    title: "Smart ID Card Detection — CA-YOLOv8",
    cat: "IEEE Xplore 2026 · Computer Vision",
    desc: "Custom YOLOv8 architecture integrating Coordinate Attention (CA) and CBAM for real-time ID detection across 800+ test cards (0.58 EER).",
    tags: ["Python", "YOLOv8", "Computer Vision", "Flask", "OpenCV"],
    imageUrl: "/assets/projects/sicd.webp",
    code: `# models/ca_yolov8.py — Coordinate Attention Block
class CoordinateAttention(nn.Module):
    def forward(self, x):
        x_h, x_w = self.pool_h(x), self.pool_w(x).permute(0, 1, 3, 2)
        y = self.act(self.bn1(self.conv1(torch.cat([x_h, x_w], dim=2))))
        x_h, x_w = torch.split(y, [x.size(2), x.size(3)], dim=2)
        return x * self.conv_h(x_h).sigmoid() * self.conv_w(x_w.permute(0,1,3,2)).sigmoid()`,
    live: "https://sicd.vercel.app",
    repo: "https://github.com/Nithwin/SICD",
    shape: 3
  },
  {
    title: "AmmuBus — Tourist Bus Booking Platform",
    cat: "Full-Stack · Production Web App",
    desc: "A comprehensive booking platform for tourist buses across 126+ cities in India featuring verified operator fleets and interactive seat allocation.",
    tags: ["Web App", "React", "Travel", "Booking"],
    imageUrl: "/assets/projects/ammubus.webp",
    code: `// services/bookingEngine.js — Real-Time Seat Allocation & Route Search
export async function bookRouteSeat(operatorId, routeId, seatNumber) {
  const session = await db.startTransaction();
  const seat = await Seats.lock(seatNumber, { timeout: 3000 });
  return await confirmBooking({ operatorId, routeId, seat, status: 'RESERVED' });
}`,
    live: "http://ammubus.in/",
    repo: "https://github.com/Nithwin/ammubus-web",
    shape: 2
  },
  {
    title: "ShadowCoders — Collaborative Dev Platform",
    cat: "Full-Stack · Real-Time Tooling",
    desc: "Full-stack collaborative developer platform with real-time workspace sharing, containerized code execution sandboxes, and developer tooling.",
    tags: ["TypeScript", "Next.js", "Express.js", "Docker", "Socket.IO"],
    imageUrl: null,
    code: `// server/execution/runner.ts — Containerized Code Sandbox
export async function executeSubmission(payload: Submission) {
  return runIsolatedContainer(payload, { timeoutMs: 2500 });
}`,
    live: "https://github.com/Nithwin/ShadowCoders",
    repo: "https://github.com/Nithwin/ShadowCoders",
    shape: 0
  },
  {
    title: "Terminal TCP/IP Chat Network",
    cat: "C++ & Networking · Linux",
    desc: "High-performance terminal chat application using raw POSIX TCP/IP socket programming with bidirectional client-server event polling.",
    tags: ["C++", "Socket Programming", "TCP/IP", "Linux"],
    imageUrl: null,
    code: `// src/net/tcp_server.cpp — Scatter/Gather Socket Dispatch
ssize_t send_packet(int fd, uint16_t op, std::span<const uint8_t> data) {
    FrameHeader hdr{htons(op), htonl(static_cast<uint32_t>(data.size()))};
    struct iovec iov[2] = {{&hdr, sizeof(hdr)}, {const_cast<uint8_t*>(data.data()), data.size()}};
    return ::writev(fd, iov, 2);
}`,
    live: "https://github.com/Nithwin/Cpp_Projects",
    repo: "https://github.com/Nithwin/Cpp_Projects",
    shape: 1
  },
  {
    title: "Kernel-Lab — C++20 Systems Lab",
    cat: "C++20 · OS Kernel",
    desc: "Low-level systems laboratory exploring 64-byte cache-aligned slab allocators, virtual page tables, and preemptive scheduling.",
    tags: ["C++20", "Slab Allocator", "OS Scheduling", "Linux"],
    imageUrl: null,
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
  }
];


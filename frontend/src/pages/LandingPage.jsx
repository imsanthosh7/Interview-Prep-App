import React, { useContext, useState } from "react";
import { MoveRight, Star, Zap, Layers, Terminal, CheckCircle2 } from "lucide-react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="font-display font-bold text-2xl tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black">
              <Terminal className="w-5 h-5" />
            </div>
            INTERVIEW PREP<span className="text-primary">.AI</span>
          </div>
          <div>
            {user ? (
              <Button onClick={() => navigate('/dashboard')} variant="secondary" size="sm" className="font-bold tracking-tight">
                DASHBOARD
              </Button>
            ) : (
              <Button onClick={() => setOpenAuthModal(true)} variant="outline" size="sm" className="text-white border-white/20 hover:bg-white hover:text-black rounded-full font-bold uppercase tracking-wider">
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* New Center-Stage Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 border-b border-white/10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            The #1 AI Interview Prep Platform
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium tracking-tighter text-white mb-8 leading-[0.9]">
            CRACK THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x bg-[length:200%_auto]">
              IMPOSSIBLE
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Stop memorizing. Start understanding. Our AI-driven engine simulates real-world technical interviews tailored to your target role.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Button size="xl" className="h-14 px-8 rounded-full text-lg font-bold bg-primary text-black hover:bg-primary/90 shadow-[0_0_30px_-5px_var(--color-primary)] transition-shadow duration-300" onClick={handleCTA}>
              Start Interview Session <MoveRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="xl" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 hidden md:flex font-medium">
              View How It Works
            </Button>
          </div>

          {/* Floating UI Elements Mockup */}
          <div className="mt-20 relative w-full max-w-4xl mx-auto hidden md:block perspective-[2000px]">
            <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl rounded-xl p-4 shadow-2xl transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out preserve-3d">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20 h-full pointer-events-none" />
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 bg-white/5 rounded-lg h-64 p-4 flex flex-col gap-3">
                  <div className="w-full h-8 bg-white/10 rounded" />
                  <div className="w-3/4 h-4 bg-white/5 rounded" />
                  <div className="w-full h-32 bg-white/5 rounded mt-auto" />
                </div>
                <div className="col-span-9 bg-white/5 rounded-lg h-64 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-black font-bold">Q</div>
                    <div className="flex-1">
                      <div className="h-6 w-3/4 bg-white/20 rounded mb-2" />
                      <div className="h-4 w-1/2 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="pl-14 space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-5/6 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
            {/* Glow under the card */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-[60px] rounded-full -z-10" />
          </div>
        </div>

        {/* Global Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-background to-background"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" />
        </div>
      </header>

      {/* Logos / Trust Section (Optional, nice to have) */}
      <section className="py-10 border-b border-white/5 bg-white/0">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Just placeholders for visual density */}
          <div className="h-8 w-24 bg-white/20 rounded" />
          <div className="h-8 w-24 bg-white/20 rounded" />
          <div className="h-8 w-24 bg-white/20 rounded" />
          <div className="h-8 w-24 bg-white/20 rounded hidden md:block" />
          <div className="h-8 w-24 bg-white/20 rounded hidden md:block" />
        </div>
      </section>

      {/* Features Section - Bento Grid Style */}
      <section className="py-24 px-6 md:px-12 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4 text-white">Why Top Engineers Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We've reverse-engineered the interview process at FAANG companies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 group relative p-8 rounded-3xl border border-white/10 bg-card/30 hover:bg-card/50 transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <Terminal className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-display text-white">Full-Stack Simulation</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Our engine doesn't just ask questions. It mimics the flow of a real system design or coding interview, diving deeper when you struggle and skipping ahead when you excel.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 rounded-3xl border border-white/10 bg-card/30 hover:bg-card/50 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display text-white">Instant Feedback Loop</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get grade-A detailed feedback on your answers instantly. No more waiting for a mock interviewer.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 rounded-3xl border border-white/10 bg-card/30 hover:bg-card/50 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display text-white">Structure & Strategy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Curated path for Frontend, Backend, and DevOps roles.
              </p>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 group relative p-8 rounded-3xl border border-white/10 bg-card/30 hover:bg-card/50 transition-colors overflow-hidden md:col-start-2">
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-display text-white">98% Success Rate</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our community members report significantly lower anxiety and higher offer rates after just 3 sessions.
                  </p>
                </div>
                <div className="flex-1 bg-black/40 rounded-xl p-4 border border-white/10 w-full">
                  <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                    <div className="text-sm font-mono text-green-500">Offer Received: Google</div>
                  </div>
                  <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                    <div className="text-sm font-mono text-green-500">Offer Received: Amazon</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                    <div className="text-sm font-mono text-green-500">Offer Received: Netflix</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-center md:text-left px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© 2025 Interview Prep AI. Crafted for builders.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono">
            <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
            <a href="#" className="hover:text-primary transition-colors">GITHUB</a>
            <a href="#" className="hover:text-primary transition-colors">DISCORD</a>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="p-4">
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signUp" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;

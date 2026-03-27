import { motion } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import React, { useState, useRef } from 'react';

export default function App() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = (clientX: number, clientY: number) => {
    if (containerRef.current && maskRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      maskRef.current.style.setProperty('--mouse-x', `${x}px`);
      maskRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="bg-[#F5F2ED] text-[#1A1A1A] min-h-screen font-sans selection:bg-[#D97757]/20 overflow-x-hidden">
      {/* Navigation - Minimalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-[#F5F2ED]">
        <div className="flex items-center">
          <img 
            src="https://i.ibb.co/fGMcvHN1/nudi-logo-prompt-black-noback.png" 
            alt="NUDI" 
            className="h-20 md:h-32 lg:h-40 w-auto invert brightness-0"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.1em] font-medium">
          <a href="#story" className="hover:opacity-60 transition-opacity">Story</a>
          <a href="#menu" className="hover:opacity-60 transition-opacity">Menu</a>
          <a href="https://www.instagram.com/nudiday/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Instagram</a>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://smartstore.naver.com/nudiday" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.1em] font-medium hover:opacity-60 transition-opacity">
            Order
          </a>
        </div>
      </nav>

      {/* Hero Section with Spotlight Reveal Effect */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
        className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-[#F5F2ED] cursor-crosshair"
      >
        {/* 1. Base Layer (Dim text & image) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 w-full h-full">
          <div className="flex flex-col items-center justify-center relative w-full max-w-6xl mx-auto h-full pt-20">
            
            {/* Massive Typography Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-20">
              <h1 className="font-serif text-[12vw] leading-[0.85] tracking-tight text-[#1A1A1A] whitespace-nowrap">
                NUDI
                <br />
                <span className="italic font-light">BAKERY</span>
              </h1>
            </div>

            <div className="mb-8 flex justify-center select-none relative z-10">
              <img 
                src="https://i.ibb.co/LwKJsLs/image.png" 
                alt="황치즈 버터바" 
                className="h-64 md:h-96 lg:h-[32rem] w-auto object-contain opacity-30 grayscale blur-[4px] transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">Gluten Free</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">Sugar Free</span>
            </div>

            <div className="absolute bottom-12 right-6 md:right-12 text-right">
              <p className="font-serif text-xl md:text-2xl text-[#1A1A1A]/50 italic">
                건강한 달콤함의 시작, 누디
              </p>
            </div>
          </div>
        </div>

        {/* 2. Reveal Layer (Bright text & image, masked by mouse) */}
        <div 
          ref={maskRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
          }}
        >
          {/* Dark background revealed by spotlight for extreme contrast */}
          <div className="absolute inset-0 bg-[#1A1A1A]"></div>
          
          <div className="flex flex-col items-center justify-center relative w-full max-w-6xl mx-auto h-full pt-20">
            
            {/* Massive Typography Revealed */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
              <h1 className="font-serif text-[12vw] leading-[0.85] tracking-tight text-[#F5F2ED] whitespace-nowrap">
                NUDI
                <br />
                <span className="italic font-light text-[#D97757]">BAKERY</span>
              </h1>
            </div>

            <div className="mb-8 flex justify-center relative z-10">
              <img 
                src="https://i.ibb.co/LwKJsLs/image.png" 
                alt="황치즈 버터바" 
                className="h-64 md:h-96 lg:h-[32rem] w-auto object-contain drop-shadow-[0_20px_50px_rgba(217,119,87,0.4)] transition-all duration-1000 scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]">Gluten Free</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]">Sugar Free</span>
            </div>

            <div className="absolute bottom-12 right-6 md:right-12 text-right">
              <p className="font-serif text-xl md:text-2xl text-[#F5F2ED] italic">
                건강한 달콤함의 시작, 누디
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Tape - Minimal */}
      <div className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-5 overflow-hidden flex whitespace-nowrap relative z-20">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-16 items-center text-[11px] font-medium uppercase tracking-[0.15em]"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span>NO SUGAR</span>
              <span className="w-1 h-1 rounded-full bg-[#D97757]"></span>
              <span>NO FLOUR</span>
              <span className="w-1 h-1 rounded-full bg-[#D97757]"></span>
              <span>NUDI BAKERY</span>
              <span className="w-1 h-1 rounded-full bg-[#D97757]"></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Brand Story (About NUDI) - Editorial Layout */}
      <section id="story" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto relative z-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="relative w-full max-w-md mx-auto md:max-w-none">
            <div className="aspect-[3/4] overflow-hidden rounded-t-full rounded-b-full">
              <img 
                src="https://images.unsplash.com/photo-1596647891238-66014468f3a8?q=80&w=1000&auto=format&fit=crop" 
                alt="Rice Flour" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              />
            </div>
            {/* Vertical Text */}
            <div className="absolute -left-2 md:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 -rotate-180" style={{ writingMode: 'vertical-rl' }}>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40">The Origin of Nudi</span>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full">
            <div className="text-[#D97757] text-[11px] font-bold tracking-[0.2em] uppercase mb-8">Brand Story</div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#1A1A1A] leading-[1.3] mb-12 break-keep">
              "엄마, 이건 마음 놓고<br />
              <span className="italic text-[#D97757]">드셔도 돼요.</span>"
            </h2>
            
            <div className="space-y-6 text-[#1A1A1A]/70 text-sm md:text-base font-light leading-relaxed max-w-xl break-words">
              <p>
                달콤한 디저트를 누구보다 좋아하셨던 엄마.<br />
                하지만 당뇨 판정 이후, 엄마의 접시 위에서 달콤함은 가장 먼저 사라져야 했습니다.
              </p>
              <p>
                아들로서 곁에서 지켜보며 가장 마음 아팠던 건, 좋아하는 즐거움을 억지로 참아야 하는 엄마의 모습이었습니다.<br />
                '건강하면서도 정말 맛있는 디저트는 없을까?'라는 간절한 물음이 '누디'의 시작이었습니다.
              </p>
              <p>
                <span className="font-medium text-[#1A1A1A] tracking-widest">'ZERO SUGAR'</span><br />
                누디는 가장 먼저 설탕을 비워냈습니다.<br />
                대신 혈당 조절을 위해 스테비아와 알룰로스로 건강한 단맛을 채웠습니다.
              </p>
              <p>
                <span className="font-medium text-[#1A1A1A] tracking-widest">'NO FLOUR'</span><br />
                그다음은 밀가루를 비워냈습니다.<br />
                사랑하는 가족이 먹을 음식이기에, 고민 끝에 선택한 정답은 결국 '우리 쌀'이었습니다. 누디는 오직 100% 국내산 쌀가루만을 사용하여, 먹고 난 후에도 속이 편안하고 쌀 특유의 담백하고 쫀득한 풍미를 살려냈습니다.
              </p>
              <p>
                수백 번의 레시피 수정과 정성 어린 테스트 끝에,<br />
                마침내 엄마에게 웃으며 건넬 수 있는 디저트가 탄생했습니다.
              </p>
              <p>
                누디(NUDI)는 약속합니다.<br />
                내가 사랑하는 사람을 위한 마음 그대로,<br />
                당신의 소중한 일상에 '미안하지 않은 달콤함'을 선물하겠습니다.
              </p>
            </div>

            <div className="mt-16">
              <button className="group inline-flex items-center gap-4 text-[11px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] hover:text-[#D97757] transition-colors">
                <span className="w-12 h-[1px] bg-[#1A1A1A] group-hover:bg-[#D97757] transition-colors"></span>
                Read Our Philosophy
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Menu Lineup - Minimalist List */}
      <section id="menu" className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="text-[#D97757] text-[11px] font-bold tracking-[0.2em] uppercase mb-6">Signature Menu</div>
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-[#1A1A1A]">
              메뉴 라인업
            </h2>
          </div>
          <p className="text-[#1A1A1A]/60 max-w-sm text-sm font-light leading-relaxed break-keep">
            쌀가루 특유의 쫀득함과 바삭함을 담은 누디의 시그니처 메뉴를 만나보세요.
          </p>
        </div>
        
        <div className="flex flex-col border-t border-[#1A1A1A]/10">
          {[
            { 
              name: "황치즈 버터바", 
              en: "Yellow Cheese Butter Bar",
              tags: ["#단짠단짠", "#무설탕", "#황치즈"],
              desc: "밀가루 없이 오직 100% 국내산 쌀가루로만 빚어내어, 입안에 착 감기는 쫀득하고 꾸덕한 식감을 완성했습니다. 진한 황치즈의 풍미는 그대로 살리되 설탕은 완전히 비워냈습니다. 기분 좋은 '단짠'의 매력을 혈당 걱정 없이 온전히 즐기실 수 있는 누디의 시그니처 입니다.",
              price: "4,500"
            },
            { 
              name: "고구마 버터바", 
              en: "Sweet Potato Butter Bar - 저지방",
              tags: ["#저지방", "#무설탕", "#고구마"],
              desc: "지방함량이 높은 음식을 못 드시는 고객님의 문의에서 착안된 지방 함량을 확 낮춘 담백하고 가벼운 버터바 입니다. 버터바의 식감을 진짜 고구마를 듬뿍 넣어 쫀득함과 자연스러운 달콤함을 끌어냈습니다. 쌀가루 특유의 고소함과 고구마가 어우러져, 속 편안하고 든든한 건강 디저트입니다.",
              price: "4,500"
            },
            { 
              name: "말차 버터바", 
              en: "Matcha Butter Bar",
              tags: ["#말차", "#무설탕", "#쫀득"],
              desc: "말차를 아낌없이 넣어, 한 입 베어 무는 순간 깊고 진한 말차향이 입안을 가득 채웁니다. 깔끔한 단맛과 말차 본연의 고급스러운 쌉싸름한 맛이 어우러진 디저트입니다. 쌀가루가 만들어낸 찰진 텍스처와 함께, 차분한 휴식 시간에 곁들이기 좋은 프리미엄 메뉴입니다.",
              price: "4,500"
            },
            { 
              name: "에그타르트", 
              en: "Rice Egg Tart",
              tags: ["#겉바속촉", "#쌀타르트지", "#무설탕"],
              desc: "쌀가루만으로 구워내어 기분 좋은 바삭함을 선사하는 타르트입니다. 그 속은 설탕 없이 건강하게 단맛을 낸 부드럽고 촉촉한 커스터드 필링으로 가득 채웠습니다. 겉은 바삭하고 속은 푸딩처럼 입에서 녹아내리는, 누구나 안심하고 먹을 수 있는 누디만의 시그니처 디저트입니다.",
              price: "4,500"
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-[#1A1A1A]/10 hover:bg-[#1A1A1A]/[0.02] transition-colors cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 w-full md:w-2/3">
                <div className="text-[#1A1A1A]/30 font-serif text-2xl italic w-8 mt-1">
                  0{i + 1}
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <h3 className="font-serif text-3xl font-medium text-[#1A1A1A]">{item.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#1A1A1A]/40">{item.en}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-[#D97757] font-medium tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#1A1A1A]/60 text-sm font-light leading-relaxed max-w-md break-keep">{item.desc}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-12 mt-6 md:mt-0 w-full md:w-1/3">
                <div className="font-serif text-2xl text-[#1A1A1A]">
                  <span className="text-sm mr-1 opacity-50">₩</span>{item.price}
                </div>
                <button className="w-10 h-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F5F2ED] transition-all duration-300 shrink-0">
                  <Plus size={18} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
           <button className="px-12 py-4 border border-[#1A1A1A] text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] hover:text-[#F5F2ED] transition-all duration-300">
              View Full Menu
           </button>
        </div>
      </section>

      {/* Footer - Massive & Minimal */}
      <footer className="pt-32 pb-12 px-6 md:px-12 bg-[#1A1A1A] text-[#F5F2ED] relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
            <div className="max-w-sm">
              <p className="font-serif text-2xl italic text-[#F5F2ED]/80 mb-6 break-keep">
                누디 베이커리<br/>
                밀가루와 설탕을 비워내다.
              </p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#F5F2ED]/40 leading-relaxed">
                100% RICE FLOUR & SUGAR-FREE BAKERY<br/>
                HEALTHY SWEETNESS FOR EVERYONE
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16 text-[11px] uppercase tracking-[0.1em]">
              <div className="flex flex-col gap-4">
                <span className="text-[#F5F2ED]/40 mb-2">Social</span>
                <a href="https://www.instagram.com/nudiday/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D97757] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#D97757] transition-colors">KakaoTalk</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[#F5F2ED]/40 mb-2">Information</span>
                <a href="#" className="hover:text-[#D97757] transition-colors">Location</a>
                <a href="#" className="hover:text-[#D97757] transition-colors">Contact</a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F5F2ED]/10 pt-12 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex flex-col items-start gap-8">
              <img 
                src="https://i.ibb.co/fGMcvHN1/nudi-logo-prompt-black-noback.png" 
                alt="NUDI" 
                className="h-20 md:h-32 w-auto object-contain object-left invert brightness-0 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="text-[11px] text-[#F5F2ED]/40 leading-relaxed font-light">
                상호 : 누디 | 대표자 : 한태윤 | 사업자등록번호: 235-39-01245<br />
                통신판매업신고번호 : 제2025-충남천안-1924호 | 이메일 : touillekim@gmail.com
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]/40 text-left md:text-right">
              © 2026 NUDI Bakery. All rights reserved.
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function HairAnalysisLab() {
  // --- State ---
  const [currentStep, setCurrentStep] = useState(1);
  const [consentGiven, setConsentGiven] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cameraStatus, setCameraStatus] = useState('Camera initializing...');

  // --- Refs ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // --- Actions ---

  // Initialize Camera
  const initCamera = async () => {
    setCapturedImage(null);
    setCameraActive(true);
    setCameraStatus('Camera initializing...');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStatus('Camera ready. Frame the hair, then tap Capture.');
      }
    } catch (err) {
      console.error(err);
      setCameraStatus('Camera unavailable. Please check permissions.');
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Capture Photo
  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopCamera(); // Freeze/Stop stream after capture
    }
  };

  // Retake
  const handleRetake = () => {
    setCapturedImage(null);
    initCamera();
  };

  // Run Fake Analysis
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(3);
    
    // Simulate API delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // --- Step Components ---

  return (
    <div className="app-container">
      {/* Header */}
      <header className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.9rem', color: 'var(--ulta-peach)', textTransform: 'uppercase' }}>In-Store Prototype</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--folica-deep)' }}>ULTA x Folica Hair Analysis Lab</span>
        </div>
        <div style={{ padding: '6px 10px', borderRadius: '999px', background: 'var(--folica-mint)', color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>
          Tablet Mode · Camera Enabled
        </div>
      </header>

      <main className="layout-grid">
        {/* Sidebar */}
        <aside className="glass-panel" style={{ padding: '16px 16px 20px', height: 'fit-content' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            Visit Flow
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map((step) => (
              <li 
                key={step} 
                className={`step-item ${currentStep === step ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 8px', borderRadius: '14px', cursor: 'pointer' }}
                onClick={() => {
                   setCurrentStep(step);
                   if(step === 2) initCamera();
                   else stopCamera();
                }}
              >
                <div className="step-badge">{step}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {step === 1 ? 'Welcome & Consent' : step === 2 ? 'Capture Hair Images' : 'AI Results & Products'}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                     {step === 1 ? 'Explain scan & privacy' : step === 2 ? 'Use tablet camera' : 'Show Ulta matches'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Panels */}
        <section className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* --- STEP 1: WELCOME --- */}
          {currentStep === 1 && (
            <div className="panel-content">
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Step 1</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--folica-deep)' }}>Welcome to your personalized hair check-in</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  This Ulta tablet uses a high-resolution camera and Folica’s AI to scan your scalp and hair.
                </div>
              </div>

              <div className="card highlight">
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>What this scan will do</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 8px' }}>
                  In under a minute, we’ll capture a few photos of your hairline, part, and ends.
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {['Dry or oily scalp', 'Breakage / split ends', 'Frizz & porosity clues', 'Curl / wave pattern'].map(t => (
                    <span key={t} className="tag orange">{t}</span>
                  ))}
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '10px 0 16px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={consentGiven} 
                    onChange={(e) => setConsentGiven(e.target.checked)} 
                    style={{ marginTop: '2px' }}
                  />
                  <span>
                    I agree to have close-up images of my hair captured for a one-time in-store analysis.
                  </span>
                </label>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      if(!consentGiven) alert('Please confirm consent first.');
                      else {
                        setCurrentStep(2);
                        initCamera();
                      }
                    }}
                  >
                    <span>📷 Start hair scan</span>
                  </button>
                  <button className="btn btn-outline">
                    <span>👩‍💼 Have a Beauty Advisor guide me</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 2: CAMERA --- */}
          {currentStep === 2 && (
            <div className="panel-content">
              <div style={{ marginBottom: '16px' }}>
                 <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Step 2</div>
                 <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--folica-deep)' }}>Capture a few quick angles</div>
              </div>

              <div className="card">
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>Camera view</div>
                <div className="camera-frame">
                  <div className="camera-video-wrapper">
                    {!capturedImage ? (
                       <video 
                         ref={videoRef} 
                         autoPlay 
                         playsInline 
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                       />
                    ) : (
                      <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    <div className="camera-overlay"></div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>• Angle 1: Scalp/part &nbsp;• Angle 2: Hairline</span>
                    <span>{cameraStatus}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {!capturedImage ? (
                      <button className="btn btn-secondary" onClick={capturePhoto}>
                        📸 Capture photo
                      </button>
                    ) : (
                      <>
                        <button className="btn btn-outline" onClick={handleRetake}>
                          🔁 Retake
                        </button>
                        <button className="btn btn-primary" onClick={runAnalysis}>
                          ✨ Analyze with AI
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 3: RESULTS --- */}
          {currentStep === 3 && (
            <div className="panel-content">
               <div style={{ marginBottom: '16px' }}>
                 <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Step 3</div>
                 <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--folica-deep)' }}>Your hair snapshot & Ulta matches</div>
                 <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                   {isAnalyzing ? "Analyzing image… reading texture, shine, and scalp clues." : "Here’s what your hair is telling us today."}
                 </div>
              </div>

              {isAnalyzing && (
                 <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ fontSize: '2rem' }}>✨</div>
                    <div>Processing AI Model...</div>
                 </div>
              )}

              {!isAnalyzing && showResults && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Metrics */}
                  <div className="card highlight">
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px' }}>Hair health at a glance</div>
                    <div className="grid-cols-2">
                       <MetricBox label="Scalp hydration" value="Slightly dry" note="Recommend gentle, hydrating cleanser" />
                       <MetricBox label="Breakage risk" value="Moderate on mid-lengths" note="Strengthening & bonding care" />
                       <MetricBox label="Frizz & porosity" value="High in humidity" note="Oil-based serums + heat protection" />
                       <MetricBox label="Texture pattern" value="Wavy 2B–2C" note="Define waves without weighing down" />
                    </div>
                  </div>

                  {/* Products */}
                  <div className="card">
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px' }}>Top Ulta picks in this store</div>
                    <div className="grid-cols-2">
                      <ProductCard 
                        name="HydraCalm Balancing Scalp Cleanser"
                        desc="Gentle, sulfate-free wash that adds moisture."
                        aisle="Haircare · Aisle 2"
                        price="$18"
                        tags={['Shampoo', 'Dry scalp']}
                      />
                      <ProductCard 
                        name="FiberShield Bond Repair Mask"
                        desc="Weekly treatment for color-treated or heat-styled hair."
                        aisle="Haircare · Aisle 3"
                        price="$32"
                        tags={['Mask', 'Bond repair']}
                      />
                       <ProductCard 
                        name="CloudVeil Anti-Frizz Leave-In"
                        desc="Lightweight smoothing for wavy hair."
                        aisle="Styling · Aisle 5"
                        price="$24"
                        tags={['Leave-in', 'Frizz']}
                      />
                       <ProductCard 
                        name="GlowWave Lightweight Hair Oil"
                        desc="Adds shine and tames flyaways."
                        aisle="Styling · Aisle 5"
                        price="$20"
                        tags={['Oil', 'Shine']}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                       <button className="btn btn-secondary">✉️ Send routine to my phone</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                     <button className="btn btn-outline" onClick={() => setCurrentStep(2)}>◀ Back to camera</button>
                     <button className="btn btn-primary" onClick={() => { setCurrentStep(1); setConsentGiven(false); setCapturedImage(null); setShowResults(false); }}>New Guest</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      
      <footer style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', paddingBottom: '16px' }}>
        Prototype only · Cameras and AI analysis are simulated for concept testing.
      </footer>
    </div>
  );
}

// --- Sub-components for cleaner code ---

function MetricBox({ label, value, note }: { label: string, value: string, note: string }) {
  return (
    <div style={{ padding: '8px 10px', borderRadius: '14px', background: '#f8f4ff', display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ color: '#6b5aa7', fontSize: '0.8rem' }}>{label}</span>
      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#342b62' }}>{value}</span>
      <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.8)', padding: '2px 6px', borderRadius: '999px', alignSelf: 'flex-start', marginTop: '2px' }}>{note}</span>
    </div>
  );
}

function ProductCard({ name, desc, aisle, price, tags }: { name: string, desc: string, aisle: string, price: string, tags: string[] }) {
  return (
    <div style={{ borderRadius: '16px', border: '1px solid #f0e2dd', padding: '10px', background: 'linear-gradient(145deg, #ffffff, #fff7f0)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
       <div style={{ display: 'flex', gap: '4px' }}>
         {tags.map(t => <span key={t} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '999px', background: 'rgba(0,0,0,0.04)' }}>{t}</span>)}
       </div>
       <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</div>
       <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{desc}</div>
       <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--folica-deep)' }}>{aisle}</div>
       <div style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '999px', background: 'rgba(59, 201, 167, 0.1)', color: 'var(--folica-deep)', width: 'fit-content' }}>
         {price}
       </div>
    </div>
  );
}
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle2, Phone, Globe, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import homeDepotAuthorized from '@/assets/home-depot-authorized.png';

interface DownloadableFlyerProps {
  showDownloadButton?: boolean;
  className?: string;
}

export function DownloadableFlyer({ showDownloadButton = true, className = '' }: DownloadableFlyerProps) {
  const flyerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const printContent = flyerRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Select Source Water - Flyer</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              background: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            
            .flyer {
              width: 8.5in;
              height: 11in;
              background: linear-gradient(180deg, #1E6FD9 0%, #3A85E0 40%, #1E6FD9 100%);
              overflow: hidden;
              position: relative;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            
            .top-section {
              padding: 48px 48px 32px;
              text-align: center;
              color: white;
              position: relative;
            }
            
            .headline {
              font-size: 42px;
              font-weight: 800;
              line-height: 1.1;
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
              letter-spacing: -0.5px;
            }
            
            .subheadline {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 40px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            
            .content-area {
              display: flex;
              gap: 40px;
              padding: 0 48px;
            }
            
            .image-side {
              flex: 1;
              position: relative;
            }
            
            .water-image {
              width: 100%;
              height: 280px;
              background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            
            .water-icon {
              font-size: 80px;
              opacity: 0.6;
            }
            
            .benefits-side {
              flex: 1;
            }
            
            .benefits {
              text-align: left;
            }
            
            .benefit {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              margin-bottom: 24px;
              font-size: 20px;
              color: white;
              font-weight: 500;
            }
            
            .benefit-icon {
              width: 28px;
              height: 28px;
              background: #123B8A;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              margin-top: 2px;
            }
            
            .benefit-icon svg {
              width: 16px;
              height: 16px;
              color: white;
            }
            
            .cta-banner {
              background: #123B8A;
              color: white;
              text-align: center;
              padding: 20px;
              margin: 40px 48px 0;
              border-radius: 12px;
              font-size: 24px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .bottom-section {
              background: white;
              margin-top: 40px;
              padding: 32px 48px;
              display: flex;
              align-items: center;
              gap: 32px;
            }
            
            .partner-area {
              display: flex;
              align-items: center;
              gap: 16px;
              flex: 1;
            }
            
            .partner-badge img {
              height: 56px;
            }
            
            .partner-text {
              font-size: 14px;
              font-weight: 700;
              color: #111;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              line-height: 1.3;
            }
            
            .partner-text span {
              color: #1E6FD9;
            }
            
            .contact-area {
              flex: 1;
              text-align: right;
            }
            
            .call-text {
              font-size: 16px;
              font-weight: 600;
              color: #111;
              margin-bottom: 4px;
            }
            
            .phone {
              font-size: 32px;
              font-weight: 800;
              color: #1E6FD9;
              margin-bottom: 4px;
            }
            
            .website {
              font-size: 14px;
              color: #666;
            }
            
            .qr-area {
              text-align: center;
            }
            
            .qr-box {
              width: 80px;
              height: 80px;
              background: #f0f0f0;
              border: 2px solid #ddd;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 8px;
            }
            
            .qr-label {
              font-size: 11px;
              font-weight: 600;
              color: #666;
              text-transform: uppercase;
            }
            
            .agent-section {
              background: #f8f8f8;
              padding: 20px 48px;
              border-top: 1px dashed #ddd;
            }
            
            .agent-row {
              display: flex;
              align-items: center;
              gap: 16px;
            }
            
            .agent-label {
              font-size: 14px;
              font-weight: 700;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .agent-line {
              flex: 1;
              height: 1px;
              background: #333;
            }
            
            @media print {
              body {
                background: white;
                padding: 0;
              }
              .flyer {
                box-shadow: none;
              }
            }
            
            @page {
              size: letter;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="flyer">
            <div class="top-section">
              <h1 class="headline">CLEANER, HEALTHIER<br/>WATER FOR</h1>
              <p class="subheadline">Northern California Homes</p>
            </div>
            
            <div class="content-area">
              <div class="image-side">
                <div class="water-image">
                  <span class="water-icon">💧</span>
                </div>
              </div>
              
              <div class="benefits-side">
                <div class="benefits">
                  <div class="benefit">
                    <div class="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Better tasting water</span>
                  </div>
                  <div class="benefit">
                    <div class="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Removes chlorine and contaminants</span>
                  </div>
                  <div class="benefit">
                    <div class="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Protects your appliances and plumbing</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="cta-banner">
              🗓️ Schedule Your FREE Water Test
            </div>
            
            <div class="bottom-section">
              <div class="partner-area">
                <div class="partner-badge">
                  <img src="${homeDepotAuthorized}" alt="Home Depot" />
                </div>
                <div class="partner-text">
                  <span>TRUSTED</span> HOME DEPOT<br/>VENDOR
                </div>
              </div>
              
              <div class="contact-area">
                <p class="call-text">CALL TODAY FOR A FREE CONSULTATION!</p>
                <p class="phone">(916) 382-0493</p>
                <p class="website">selectsourcewater.com</p>
              </div>
              
              <div class="qr-area">
                <div class="qr-box">QR</div>
                <p class="qr-label">Scan Here</p>
              </div>
            </div>
            
            <div class="agent-section">
              <div class="agent-row">
                <span class="agent-label">Agent's Name:</span>
                <div class="agent-line"></div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {showDownloadButton && (
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download Flyer (PDF)
        </Button>
      )}
      
      {/* Preview version - scaled down */}
      <motion.div
        ref={flyerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] aspect-[8.5/11] bg-gradient-to-b from-primary via-primary/80 to-primary rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Top Section */}
        <div className="pt-8 px-6 text-center text-primary-foreground">
          <h2 className="text-lg font-extrabold leading-tight mb-1 drop-shadow-sm">
            CLEANER, HEALTHIER<br/>WATER FOR
          </h2>
          <p className="text-xs font-semibold uppercase tracking-widest mb-6">
            Northern California Homes
          </p>
        </div>
        
        {/* Content Area */}
        <div className="flex gap-4 px-6">
          {/* Image placeholder */}
          <div className="flex-1">
            <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
              <Droplets className="w-10 h-10 text-primary-foreground/60" />
            </div>
          </div>
          
          {/* Benefits */}
          <div className="flex-1 space-y-2">
            {[
              'Better tasting water',
              'Removes chlorine and contaminants',
              'Protects your appliances and plumbing',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-primary-foreground">
                <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-accent-foreground" />
                </div>
                <span className="text-[10px] leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="mx-6 mt-4 bg-accent text-accent-foreground text-center py-2 rounded-md">
          <p className="text-xs font-bold uppercase tracking-wide">
            🗓️ Schedule Your FREE Water Test
          </p>
        </div>
        
        {/* Bottom Section */}
        <div className="bg-white mt-4 px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <img src={homeDepotAuthorized} alt="Home Depot" className="h-8 object-contain" />
            <div className="text-[8px] font-bold text-foreground leading-tight">
              <span className="text-primary">TRUSTED</span> HOME DEPOT<br/>VENDOR
            </div>
          </div>
          
          <div className="text-right flex-1">
            <p className="text-[7px] font-semibold text-foreground">CALL TODAY!</p>
            <p className="text-sm font-extrabold text-primary">(916) 382-0493</p>
            <p className="text-[7px] text-muted-foreground">selectsourcewater.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-muted rounded border border-border flex items-center justify-center text-[8px] text-muted-foreground">
              QR
            </div>
            <p className="text-[6px] font-semibold text-muted-foreground mt-1">SCAN HERE</p>
          </div>
        </div>
        
        {/* Agent Section */}
        <div className="bg-secondary px-4 py-2 border-t border-dashed border-border">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-muted-foreground uppercase">Agent's Name:</span>
            <div className="flex-1 border-b border-foreground" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

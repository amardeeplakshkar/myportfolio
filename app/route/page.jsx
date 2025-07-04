"use client";

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, RefreshCw, ArrowRight, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Your predefined gradient colors
const GRADIENT_COLORS = [
  ["#4f0f6f", "#cb3ca0"], // T4.Chat
  ["#254264", "#f57d4f"], // Huminex
  ["#631b6e", "#ee8c5e"], // Build Portfolio
  ["#0f384c", "#3cb4bf"], // Developer Think
  ["#5c3f26", "#d9c4a1"], // Neuranium
  ["#3c326f", "#ae85f3"], // Resume Editor
  ["#20202b", "#1f9df7"], // OG Image Generator
  ["#3e1c1c", "#df612d"], // Persona AI
  ["#64113f", "#ef3f5e"], // Do Paste
  ["#3a335d", "#dad9e5"], // Dribbble Clone
  ["#1d283a", "#4c5b8c"], // Admin Dashboard
  ["#19706d", "#d7f0d0"], // E-commerce
];

function App() {
  const canvasRef = useRef(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [screenshotPreviewUrl, setScreenshotPreviewUrl] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [gradientIndex, setGradientIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generate screenshot URL
  const generateScreenshotUrl = (url, width = 800, height = 600) => {
    const params = new URLSearchParams({
      url: url,
      screenshot: 'true',
      meta: 'false',
      embed: 'screenshot.url',
      colorScheme: 'dark',
      'viewport.width': (1920).toString(),
      'viewport.height': (1080).toString(),
    });
    return `https://api.microlink.io/?${params.toString()}`;
  };

  // Handle form submit to fetch screenshot preview
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!websiteUrl) return;
    
    setIsLoading(true);
    try {
      const previewUrl = generateScreenshotUrl(websiteUrl);
      setScreenshotPreviewUrl(previewUrl);
      toast.success('Screenshot generated successfully!');
    } catch (error) {
      console.error('Error generating screenshot:', error);
      toast.error('Failed to generate screenshot. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate OG image with selected gradient
  const generateOgImage = (imageUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const size = 1200;
    canvas.width = size;
    canvas.height = size;

    // Use current gradient
    const [colorStart, colorEnd] = GRADIENT_COLORS[gradientIndex];

    // Create a vibrant gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Load and draw the screenshot image centered
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => {
      img.style.borderRadius = '1rem';
      const maxImageSize = size * 0.8;

      const aspectRatio = img.width / img.height;
      let drawWidth, drawHeight;

      if (aspectRatio > 1) {
        // Landscape
        drawWidth = maxImageSize;
        drawHeight = maxImageSize / aspectRatio;
      } else {
        // Portrait
        drawHeight = maxImageSize;
        drawWidth = maxImageSize * aspectRatio;
      }
      const x = (size - drawWidth) / 2;
      const y = (size - drawHeight) / 2;
      const radius = 20; // Corner radius

      // Draw rounded rectangle clip
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + drawWidth - radius, y);
      ctx.quadraticCurveTo(x + drawWidth, y, x + drawWidth, y + radius);
      ctx.lineTo(x + drawWidth, y + drawHeight - radius);
      ctx.quadraticCurveTo(x + drawWidth, y + drawHeight, x + drawWidth - radius, y + drawHeight);
      ctx.lineTo(x + radius, y + drawHeight);
      ctx.quadraticCurveTo(x, y + drawHeight, x, y + drawHeight - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      ctx.restore();

      // Save as data URL
      const dataUrl = canvas.toDataURL('image/png');
      setOgImageUrl(dataUrl);
    };
  };

  const handleCreateOgImage = () => {
    if (screenshotPreviewUrl) {
      setIsLoading(true);
      try {
        generateOgImage(screenshotPreviewUrl);
        toast.success('OG Image generated successfully!');
      } catch (error) {
        console.error('Error generating OG image:', error);
        toast.error('Failed to generate OG image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Randomize gradient index
  const handleRandomizeGradient = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * GRADIENT_COLORS.length);
    } while (newIndex === gradientIndex && GRADIENT_COLORS.length > 1);
    
    setGradientIndex(newIndex);
    toast.success('Gradient updated!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="text-2xl font-bold">OG Image Generator</CardTitle>
            <CardDescription className="text-purple-100">
              Create beautiful social media preview images for any website
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="website-url" className="sr-only">Website URL</Label>
                    <Input
                      id="website-url"
                      type="url"
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="h-12 px-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleRandomizeGradient}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Randomize Gradient
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="advanced-mode" 
                      checked={showAdvanced}
                      onCheckedChange={setShowAdvanced}
                    />
                    <Label htmlFor="advanced-mode">Advanced Settings</Label>
                  </div>
                </div>

                {showAdvanced && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-3">Advanced Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                            <Label htmlFor="gradient-start">Gradient Start</Label>
                            <Input 
                              id="gradient-start" 
                              type="color" 
                              value={GRADIENT_COLORS[gradientIndex][0]} 
                              className="h-10 w-full p-1"
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="gradient-end">Gradient End</Label>
                            <Input 
                              id="gradient-end" 
                              type="color" 
                              value={GRADIENT_COLORS[gradientIndex][1]} 
                              className="h-10 w-full p-1"
                              disabled
                            />
                          </div>
                    </div>
                  </div>
                )}
              </div>

              {screenshotPreviewUrl && (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b">
                      <h3 className="font-medium">Screenshot Preview</h3>
                    </div>
                    <img
                      src={screenshotPreviewUrl}
                      alt="Website Screenshot"
                      className="w-full border-t"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      onClick={handleCreateOgImage}
                      className="gap-2"
                      disabled={!screenshotPreviewUrl}
                    >
                      <span>Create OG Image</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {ogImageUrl && (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b">
                      <h3 className="font-medium">Generated OG Image</h3>
                    </div>
                    <div className="p-4 flex justify-center bg-gray-50">
                      <img
                        src={ogImageUrl}
                        alt="Generated OG Image"
                        className="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <a
                      href={ogImageUrl}
                      download={`og-${new Date().getTime()}.png`}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </a>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t px-6 py-4">
            <p className="text-sm text-gray-500">
              Generated images are 1200×630 pixels, perfect for social media sharing.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Hidden canvas for drawing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default App;
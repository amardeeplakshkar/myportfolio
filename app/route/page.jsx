"use client";

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, RefreshCw, ArrowRight, Loader2, Upload, Link2, Image as ImageIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const GRADIENT_COLORS = [
  ["#4f0f6f", "#cb3ca0"], 
  ["#254264", "#f57d4f"], 
  ["#631b6e", "#ee8c5e"], 
  ["#0f384c", "#3cb4bf"], 
  ["#5c3f26", "#d9c4a1"], 
  ["#3c326f", "#ae85f3"], 
  ["#20202b", "#1f9df7"], 
  ["#3e1c1c", "#df612d"], 
  ["#64113f", "#ef3f5e"], 
  ["#3a335d", "#dad9e5"], 
  ["#1d283a", "#4c5b8c"], 
  ["#19706d", "#d7f0d0"], 
];

function App() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [screenshotPreviewUrl, setScreenshotPreviewUrl] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [gradientIndex, setGradientIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inputMode, setInputMode] = useState('url'); 

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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result;
      setUploadedImageUrl(imageUrl);
      setScreenshotPreviewUrl(''); 
      toast.success('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const generateOgImage = (imageUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const size = 1200;
    canvas.width = size;
    canvas.height = size;

    const [colorStart, colorEnd] = GRADIENT_COLORS[gradientIndex];

    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => {
      img.style.borderRadius = '1rem';
      const maxImageSize = size * 0.8;

      const aspectRatio = img.width / img.height;
      let drawWidth, drawHeight;

      if (aspectRatio > 1) {
        drawWidth = maxImageSize;
        drawHeight = maxImageSize / aspectRatio;
      } else {
        drawHeight = maxImageSize;
        drawWidth = maxImageSize * aspectRatio;
      }
      const x = (size - drawWidth) / 2;
      const y = (size - drawHeight) / 2;
      const radius = 20; 

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

      const dataUrl = canvas.toDataURL('image/png');
      setOgImageUrl(dataUrl);
    };
  };

  const handleCreateOgImage = () => {
    const imageUrl = inputMode === 'url' ? screenshotPreviewUrl : uploadedImageUrl;
    if (imageUrl) {
      setIsLoading(true);
      try {
        generateOgImage(imageUrl);
        toast.success('OG Image generated successfully!');
      } catch (error) {
        console.error('Error generating OG image:', error);
        toast.error('Failed to generate OG image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

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
                {}
                <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
                  <Button
                    type="button"
                    variant={inputMode === 'url' ? 'default' : 'ghost'}
                    className="flex-1 gap-2"
                    onClick={() => setInputMode('url')}
                  >
                    <Link2 className="h-4 w-4" />
                    Website URL
                  </Button>
                  <Button
                    type="button"
                    variant={inputMode === 'upload' ? 'default' : 'ghost'}
                    className="flex-1 gap-2"
                    onClick={() => setInputMode('upload')}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Upload Image
                  </Button>
                </div>

                {}
                {inputMode === 'url' && (
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
                )}

                {}
                {inputMode === 'upload' && (
                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-4">
                        Drag and drop an image here, or click to select
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose Image
                      </Button>
                    </div>
                  </div>
                )}

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

              {}
              {(screenshotPreviewUrl || uploadedImageUrl) && (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b">
                      <h3 className="font-medium">
                        {inputMode === 'url' ? 'Screenshot Preview' : 'Uploaded Image Preview'}
                      </h3>
                    </div>
                    <img
                      src={inputMode === 'url' ? screenshotPreviewUrl : uploadedImageUrl}
                      alt={inputMode === 'url' ? 'Website Screenshot' : 'Uploaded Image'}
                      className="w-full border-t"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleCreateOgImage}
                      className="gap-2"
                      disabled={!(screenshotPreviewUrl || uploadedImageUrl)}
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
              Generated images are 1200 x 1200 pixels, perfect for social media sharing.
            </p>
          </CardFooter>
        </Card>
      </div>

      {}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default App;
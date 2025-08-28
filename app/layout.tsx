import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "自建不蒜子 - 网站访问量统计",
  description: "一个简易的页面访问统计系统, 便捷统计静态博客访问数据",
  keywords: "访问统计, 自建不蒜子, 静态博客统计, busuanzi, hexo, hugo",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://font.onmicrosoft.cn/lxgw-wenkai-screen-webfont@1.6.0/style.css" />
        <link href="https://static.iirose.cn/font/JetBrainMono/JetbrainMono.css" rel="stylesheet" />
        <link href="https://static.iirose.cn/highlight/atom-one-dark.css" type="text/css" rel="stylesheet" />
        <Script defer src="https://um.cmds.run/script.js" data-website-id="3e7b147b-778d-44f6-8e77-86afd47070c0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

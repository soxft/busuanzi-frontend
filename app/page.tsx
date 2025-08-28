"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link, Check, Copy } from "lucide-react";
import { bsz, Resp } from "@/lib/utils";

const Home = () => {
  const CodeBlock = lazy(() => import("@/components/CodeBlock"));

  const code = `<script defer src="https://busuanzi.9420.ltd/js"></script>

本文总阅读量 <span id="busuanzi_page_pv"></span> 次
本文总访客量 <span id="busuanzi_page_uv"></span> 人
本站总访问量 <span id="busuanzi_site_pv"></span> 次
本站总访客数 <span id="busuanzi_site_uv"></span> 人`;

  const [isCopied, setIsCopied] = useState(false);
  const [bsz, setBsz] = useState<bsz>({
    site_pv: "-",
    site_uv: "-",
    page_pv: "-",
    page_uv: "-",
  });

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const format = (num: number, style: string = "default"): string => {
    if (style === "comma") return num.toLocaleString();
    if (style === "short") {
      const units = ["", "K", "M", "B", "T"];
      const index = Math.floor(Math.log10(num) / 3);
      num /= Math.pow(1000, index);
      return `${Math.round(num * 100) / 100}${units[index]}`;
    }
    return num.toString();
  };

  useEffect(() => {
    const token = localStorage.getItem("bsz-id");

    fetch("https://bsz.iirose.cn/api", {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "x-bsz-referer": window.location.href,
      },
    })
      .then(async (res) => {
        const data: Resp = await res.json();
        if (data.success === true) {
          const bsz = data.data;
          bsz.site_pv = format(parseInt(bsz.site_pv), "short");
          bsz.site_uv = format(parseInt(bsz.site_uv), "short");
          bsz.page_pv = format(parseInt(bsz.page_pv), "short");
          bsz.page_uv = format(parseInt(bsz.page_uv), "short");

          setBsz(bsz);

          const setIdentity = res.headers.get("Set-Bsz-Identity");
          if (setIdentity != null && setIdentity != "")
            localStorage.setItem("bsz-id", setIdentity);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const codeBlock = useMemo(() => {
    return <CodeBlock code={code} language="html" />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* GitHub corner */}
      <a
        href="https://github.com/soxft/busuanzi"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0 z-10"
        aria-label="View project on GitHub"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          className="absolute top-0 right-0 border-0"
          aria-hidden="true"
        >
          <path
            d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
            fill="currentColor"
            className="text-gray-200 dark:text-gray-800"
          ></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            className="text-gray-800 dark:text-gray-200"
            style={{ transformOrigin: "130px 106px" }}
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="text-gray-800 dark:text-gray-200"
          ></path>
        </svg>
      </a>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">自建不蒜子</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          简单、轻量的网页计数器
        </p>
      </header>

      <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">前言</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                关于不蒜子
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => window.open("https://busuanzi.apifox.cn")}
            >
              <Link className="mr-2 h-4 w-4" /> 使用文档
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>不蒜子是一款不错的访问量统计工具</li>
            <li>
              本站模仿其功能，通过 Golang + Redis 实现, 需要注意，本站无 SLA
              与数据完整保证
            </li>
            <li>
              后端部署于阿里云上海，使用本站时，我们可能会收集您的访问记录以用于数据统计、分析、展示
            </li>
          </ul>
        </CardContent>

        <div className="border-t border-gray-200 dark:border-gray-700 mx-5 mt-4 mb-1" />

        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">使用方法</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                在您的网站中嵌入统计代码
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> 已复制
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> 复制代码
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>{codeBlock}</Suspense>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">统计演示</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            本页面的实时统计数据
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">
                本页访问量
              </span>
              <Badge
                variant="secondary"
                id="busuanzi_page_pv"
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                {bsz.page_pv}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">
                本页访客数
              </span>
              <Badge
                variant="secondary"
                id="busuanzi_page_uv"
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                {bsz.page_uv}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">
                本站访问量
              </span>
              <Badge
                variant="secondary"
                id="busuanzi_site_pv"
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                {bsz.site_pv}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">
                本站访客数
              </span>
              <Badge
                variant="secondary"
                id="busuanzi_site_uv"
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                {bsz.site_uv}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} <a href="//www.xsot.cn" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">xcsoft</a>. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
            <span>Deployed on</span>
            <a 
              href="https://www.netlify.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="h-4 w-4 ml-1" viewBox="0 0 40 40" fill="currentColor">
                <path d="M28.589 14.135l-.014-.006c-.008-.003-.016-.006-.023-.013a.11.11 0 01-.028-.093l.773-4.726 3.625 3.626-3.77 1.604a.083.083 0 01-.033.006h-.015a.104.104 0 01-.02-.003.092.092 0 01-.025-.01.088.088 0 01-.03-.026.088.088 0 01-.025-.037zm5.258-.288l3.876 3.876c.805.806 1.208 1.208 1.355 1.674.022.069.04.138.054.209l-9.263-3.923a.728.728 0 00-.015-.006c-.037-.015-.08-.032-.08-.07 0-.038.044-.056.081-.071l.012-.005 3.98-1.684zm5.127 7.003c-.2.376-.59.766-1.25 1.427l-4.37 4.369-5.652-1.177-.03-.006c-.05-.008-.103-.017-.103-.062a1.706 1.706 0 00-.655-1.193c-.023-.023-.017-.059-.01-.092 0-.005 0-.01.002-.014l1.063-6.526.004-.022c.006-.05.015-.108.06-.108a1.73 1.73 0 001.16-.665c.009-.01.015-.021.027-.027.032-.015.07 0 .103.014l9.65 4.082zm-6.625 6.801l-7.186 7.186 1.23-7.56.002-.01a.136.136 0 01.006-.029c.01-.024.036-.034.061-.044l.012-.005a1.85 1.85 0 00.695-.517c.024-.028.053-.055.09-.055.035 0 .06.02.086.038l5.004 1.05zm-10.362 8.193l-.006.006-6.542-11.03a2.048 2.048 0 00.958-1.27c.024-.065.05-.076.107-.076.035 0 .063.008.094.02a2.09 2.09 0 00.99.183h.008a.154.154 0 01.03.002c.018 0 .034.006.05.012l6.477 1.343-2.166 10.81zM8.211 37.342c-1.24-2.09-2.425-4.094-2.702-4.576a.56.56 0 01-.049-.186c0-.015 0-.029.002-.043l.136-.829 6.472 10.911-3.86-5.276zm-2.23-8.311l1.491-9.164c.008-.05.016-.108.076-.108a1.78 1.78 0 00.982-.524c.026-.031.054-.062.093-.062.03 0 .055.013.08.027l10.988 5.778a2.048 2.048 0 00-.675 1.355c0 .031-.01.052-.028.07-.017.017-.036.021-.056.025l-12.951 2.603zm3.645-11.312l6.695-6.695 3.62 6.1-4.145 2.183a.136.136 0 01-.03.012c-.024.01-.05.02-.05.055a1.779 1.779 0 00-.553 1.01c-.008.03-.016.06-.042.06-.025 0-.042-.02-.063-.04l-5.432-2.685zm9.91-8.91C19.778 8.568 20.779 8 21.283 8c.295 0 .577.124.855.288l6.367 10.732-4.779 2.518a.156.156 0 01-.035.016.106.106 0 01-.05.006c-.037 0-.07-.022-.09-.05a2.02 2.02 0 00-1.499-.676c-.047 0-.066-.032-.081-.066l-.007-.012-2.429-11.95zm10.391 1.375c.007.007.012.013.019.021.005.007.012.013.017.02l5.129 8.642a.16.16 0 01.015.035c.007.022.01.05.01.073a1.766 1.766 0 00.521 1.106c.03.03.025.077.021.116a.076.076 0 01-.006.023l-4.732.792-3.567-6.01 2.573-4.681z"/>
              </svg>
              <span className="ml-1 font-medium">Netlify</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

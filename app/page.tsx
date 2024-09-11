"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { Link, Check, Copy } from "lucide-react"
import { bsz } from "@/lib/utils"

const Home = () => {
  const CodeBlock = lazy(() => import('@/components/CodeBlock'))

  const code = `<script defer src="https://busuanzi.9420.ltd/js"></script>

本文总阅读量 <span id="busuanzi_page_pv"></span> 次
本文总访客量 <span id="busuanzi_page_uv"></span> 人
本站总访问量 <span id="busuanzi_site_pv"></span> 次
本站总访客数 <span id="busuanzi_site_uv"></span> 人`

  const [isCopied, setIsCopied] = useState(false)
  const [bsz, setBsz] = useState<bsz>({
    site_pv: "-",
    site_uv: "-",
    page_pv: "-",
    page_uv: "-"
  })

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  useEffect(() => {
    const token = localStorage.getItem("bsz-id");

    fetch("https://bsz.iirose.cn/api", {
      method: "POST",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
        "x-bsz-referer": window.location.href
      },
    })
      .then(async res => {
        const data = await res.json();
        if (data.success === true) {
          setBsz(data['data']);

          const setIdentity = res.headers.get("Set-Bsz-Identity");
          if (setIdentity != null && setIdentity != "") localStorage.setItem("bsz-id", setIdentity);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [])

  const codeBlock = useMemo(() => {
    return <CodeBlock code={code} language="html" />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <svg width="80" height="80" viewBox="0 0 250 250" className="absolute top-0 right-0 border-0" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" fill="currentColor" className="text-gray-200 dark:text-gray-800"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="text-gray-800 dark:text-gray-200" style={{ transformOrigin: '130px 106px' }}></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="text-gray-800 dark:text-gray-200"></path>
        </svg>
      </a>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">自建不蒜子</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">简单、轻量的网页计数器</p>
      </header>

      <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">前言</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">关于不蒜子</CardDescription>
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
            <li>本站模仿其功能，通过 Golang + Redis 实现 <del>需要注意，本站无SLA保证</del></li>
            <li>后端部署于阿里云上海，使用本站时，我们可能会收集您的访问记录以用于数据统计、分析、展示</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">使用方法</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">在您的网站中嵌入统计代码</CardDescription>
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
          <Suspense fallback={<div>Loading...</div>}>
            {codeBlock}
          </Suspense>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">统计演示</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">本页面的实时统计数据</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">本页访问量</span>
              <Badge variant="secondary" id="busuanzi_page_pv" className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">{bsz.page_pv}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">本页访客数</span>
              <Badge variant="secondary" id="busuanzi_page_uv" className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">{bsz.page_uv}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">本站访问量</span>
              <Badge variant="secondary" id="busuanzi_site_pv" className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">{bsz.site_pv}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">本站访客数</span>
              <Badge variant="secondary" id="busuanzi_site_uv" className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">{bsz.site_uv}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center mt-8">
        {/* <Button variant="outline" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => window.open("https://github.com/soxft/busuanzi")}>
          <Star className="mr-2 h-4 w-4" /> 在 GitHub 上支持我们
        </Button> */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          © {new Date().getFullYear()} <a href="//www.xsot.cn">xcsoft</a>. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Home;
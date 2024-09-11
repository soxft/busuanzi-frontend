'use client'

import React, { useEffect, useRef } from 'react'

import hljs from 'highlight.js/lib/core';
import html from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('html', html);

interface CodeBlockProps {
    code: string
    language: string
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
    const codeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (code === "") return
        if (codeRef.current) hljs.highlightElement(codeRef.current)
    }, [code])

    return (
        <pre className="p-2 text-sm overflow-x-auto">
            <code ref={codeRef} className={`language-${language} rounded-md`}>
                {code}
            </code>
        </pre>
    )
}

export default CodeBlock
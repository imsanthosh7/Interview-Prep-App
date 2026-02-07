import React, { useState } from 'react'
import { Copy, Check, Code } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Markdown from 'react-markdown';
import { Button } from '@/components/ui/button';

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className='max-w-none text-muted-foreground/90 font-light leading-7'>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isInline = !className;
            return !isInline ? (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={language}
              />
            ) : (
              <code className='px-1.5 py-0.5 bg-white/10 rounded text-sm font-mono text-primary/80' {...props}>
                {children}
              </code>
            );
          },
          p({ children }) { return <p className='mb-4 text-base'>{children}</p>; },
          strong({ children }) { return <strong className='font-bold text-white'>{children}</strong>; },
          ul({ children }) { return <ul className='list-disc pl-5 space-y-2 mb-4 marker:text-primary'>{children}</ul>; },
          ol({ children }) { return <ol className='list-decimal pl-5 space-y-2 mb-4 marker:text-primary'>{children}</ol>; },
          li({ children }) { return <li className='pl-1'>{children}</li>; },
          blockquote({ children }) { return <blockquote className='border-l-2 border-primary pl-4 italic my-4 text-white/70 bg-white/5 py-2 pr-2 rounded-r'>{children}</blockquote>; },
          h1({ children }) { return <h1 className='text-2xl font-display font-bold mt-8 mb-4 text-white border-b border-white/10 pb-2'>{children}</h1>; },
          h2({ children }) { return <h2 className='text-xl font-display font-bold mt-6 mb-3 text-white'>{children}</h2>; },
          h3({ children }) { return <h3 className='text-lg font-display font-medium mt-5 mb-2 text-white'>{children}</h3>; },
          a({ children, href }) { return <a href={href} className='text-primary hover:underline underline-offset-4' target="_blank" rel="noopener noreferrer">{children}</a>; },
          table({ children }) {
            return (
              <div className='overflow-x-auto my-6 border border-white/10 rounded-lg'>
                <table className='min-w-full divide-y divide-white/10'>
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) { return <thead className='bg-white/5'>{children}</thead>; },
          tbody({ children }) { return <tbody className='divide-y divide-white/5'>{children}</tbody>; },
          tr({ children }) { return <tr>{children}</tr>; },
          th({ children }) { return <th className='px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider'>{children}</th>; },
          td({ children }) { return <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-300'>{children}</td>; },
          img({ src, alt }) { return <img src={src} alt={alt} className='my-6 rounded-lg border border-white/10 shadow-lg' />; }
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='relative my-6 rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-xl group'>
      <div className='flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5'>
        <div className='flex items-center space-x-2'>
          <Code size={14} className='text-muted-foreground' />
          <span className='text-xs font-mono text-muted-foreground uppercase'>
            {language || "sh"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyCode}
          className='h-6 w-6 text-muted-foreground hover:text-white'
          aria-label='Copy code'
        >
          {copied ? <Check size={14} className='text-green-500' /> : <Copy size={14} />}
        </Button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ fontSize: 13, margin: 0, padding: "1.5rem", background: "transparent", lineHeight: 1.6 }}
        showLineNumbers={true}
        lineNumberStyle={{ minWidth: "2em", paddingRight: "1em", color: "#555", textAlign: "right" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default AIResponsePreview
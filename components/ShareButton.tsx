'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Check, Share } from 'lucide-react'

const ShareButton = ({ url }: { url: string }) => {
    const [copied, setCopied] = useState(false)
    return (
        <Button
            onClick={() => {
                navigator.clipboard.writeText(url)
                setCopied(true)

                setTimeout(() => {
                    setCopied(false)
                }, 2000)
            }}
            variant="outline"
        >
            {copied ?
                <>
                    <Check className="mr-1 h-4 w-4" />
                    Copied!
                </>
                :
                <>
                    <Share className="mr-1 h-4 w-4" />
                    Share Post
                </>
            }
        </Button>
    )
}

export default ShareButton
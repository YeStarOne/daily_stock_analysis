import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';

const STRATEGY_PANEL_URL = 'http://localhost:8000';

const StrategyPage: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [retryKey]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setRetryKey((k) => k + 1);
  };

  const handleOpenExternal = () => {
    window.open(STRATEGY_PANEL_URL, '_blank');
  };

  if (hasError) {
    return (
      <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">战法监控服务未连接</h2>
          <p className="mt-1 text-sm text-secondary-text">
            请确认 1313 监控服务已在端口 8000 启动
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            重试连接
          </button>
          <button
            type="button"
            onClick={handleOpenExternal}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-secondary-text transition-colors hover:bg-hover hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            新窗口打开
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-xl border border-border">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-secondary-text">加载战法监控面板...</p>
          </div>
        </div>
      )}
      <div className="absolute right-2 top-2 z-20">
        <button
          type="button"
          onClick={handleOpenExternal}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-card/80 text-secondary-text backdrop-blur-sm transition-colors hover:bg-hover hover:text-foreground"
          title="在新窗口中打开"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
      <iframe
        ref={iframeRef}
        key={retryKey}
        src={STRATEGY_PANEL_URL}
        className={cn('h-full w-full border-0', isLoading ? 'invisible' : 'visible')}
        onLoad={handleLoad}
        onError={handleError}
        title="战法监控面板"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
};

export default StrategyPage;

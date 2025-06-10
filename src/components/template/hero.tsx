import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

/**
 * Hero 組件屬性介面
 */
interface HeroProps {
  /**
   * 公司標誌圖片路徑
   */
  logoImage: string;
  /**
   * 新功能標籤文字
   */
  newFeatureText: string;
  /**
   * 版本資訊文字
   */
  versionText: string;
  /**
   * 主標題
   */
  title: string;
  /**
   * 副標題描述
   */
  description: string;
  /**
   * 主要按鈕文字
   */
  primaryButtonText: string;
  /**
   * 次要按鈕文字
   */
  secondaryButtonText: string;
  /**
   * 主要按鈕點擊事件
   */
  onPrimaryButtonClick?: () => void;
  /**
   * 次要按鈕點擊事件
   */
  onSecondaryButtonClick?: () => void;
  /**
   * 截圖圖片路徑
   */
  screenshotImage: string;
}

/**
 * Hero 組件
 * @param props 組件屬性
 * @returns Hero 組件
 */
export function Hero({
  logoImage,
  newFeatureText,
  versionText,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  screenshotImage,
}: HeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
          <Image alt="Your Company" src={logoImage} className="h-11" />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                {newFeatureText}
              </span>
              <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                <span>{versionText}</span>
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-5 text-gray-400"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
            {title}
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {description}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="#"
              onClick={onPrimaryButtonClick}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {primaryButtonText}
            </Link>
            <Link
              href="#"
              onClick={onSecondaryButtonClick}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {secondaryButtonText} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                alt="App screenshot"
                src={screenshotImage}
                width={2432}
                height={1442}
                className="w-304 rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import ImageAnnotatorContainer from "@/features/image-upload/components/ImageAnnotationContainer";

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

export default function Home() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <ImageAnnotatorContainer width="w-64" height="h-64" />
    </div>
  );
}

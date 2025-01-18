import ScoreDataWrapper from "@/components/features/score/ScoreDataWrapper";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const { slug: scoreId } = params;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <ScoreDataWrapper scoreId={scoreId} />
    </main>
  );
}

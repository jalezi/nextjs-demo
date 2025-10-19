type Props = LayoutProps<"/parallel">;

export default function ParallelLayout({ children, team, analytics }: Props) {
  return (
    <div className="space-y-6">
      <div>{children}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-blue-200 p-4 rounded bg-blue-50">
          {team}
        </div>
        <div className="border-2 border-green-200 p-4 rounded bg-green-50">
          {analytics}
        </div>
      </div>
    </div>
  );
}

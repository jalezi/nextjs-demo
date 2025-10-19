type Props = LayoutProps<"/photos">;

export default function PhotosLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

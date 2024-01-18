interface DrawerProps {
  onClose: () => void;
}

export default function Drawer(props: DrawerProps) {
  const { onClose } = props;

  return (
    <div className="z-100 absolute bg-black bg-opacity-50 h-full w-full" onClick={() => onClose()}>
      <div className="z-101 left-0 bg-paper text-white h-full w-60 pt-2 flex flex-col items-center" onClick={(event) => event.stopPropagation()}>
        <div className="font-bold text-2xl">Menu</div>
      </div>
    </div>
  );
}

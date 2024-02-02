import { items } from "./Config";

interface DrawerProps {
  onClose: () => void;
}

export default function Drawer(props: DrawerProps) {
  const { onClose } = props;

  return (
    <div className="z-100 absolute bg-black bg-opacity-50 h-full w-full" onClick={() => onClose()}>
      <div className="z-101 left-0 bg-paper text-white h-full w-60 pt-2 flex flex-col items-center" onClick={(event) => event.stopPropagation()}>
        <div className="font-bold text-2xl">Menu</div>
        <div className="flex flex-col space-y-2 mt-4 text-primary">
          {items.map((item) => (
            <button key={item.title} className="flex flex-row space-x-5 relative text-md hover:bg-hover-nav-button px-1.5 py-2 rounded">
              {item.icon} {<span>{item.title}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

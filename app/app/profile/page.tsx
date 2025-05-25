import GestionarCuenta from '@/components/GestionarCuenta';

export default function ProfilePage() {
  return (
    <div className="w-[500px] h-full bg-white rounded-[50px] shadow-md p-8 mx-auto my-5 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <GestionarCuenta />
      </div>
    </div>
  );
}

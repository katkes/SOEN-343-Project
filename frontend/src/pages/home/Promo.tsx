import CustomButton from '../../components/CustomButton';

export default function Promo() {
  return (
    <div className="bg-[#637EFE] mx-auto">
      <div className="flex items-center py-12 px-24">
        <div className="text-3xl font-bold text-white join flex-3/5 px-32">
          Join Us Now and Start Learning with the Millions of Other Users!
        </div>

        <div className="text-l pl-12 text-[#637EFE] flex-2/5">
          <div className="ml-32">
            <CustomButton
              width="w-[150px]"
              bgColor="bg-[#FFFF]"
              textColor="text-[#637EFE]"
              rounded="rounded-full"
              hoverColor="hover:bg-gray-300"
            >
              Join Us Now!
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

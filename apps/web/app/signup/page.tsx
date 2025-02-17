import SignUpComponent from "../../components/SignUpComponent"
export default function Login() {
    return (
        <div className="min-h-screen bg-cyan-50 text-black flex w-screen justify-center items-center">
            <div className="border border-black/20 flex flex-col space-y-12 w-96 px-3 py-5 rounded-xl">
                <div className="w-full text-center text-2xl font-semibold">Enter into zCanvas</div>
                <div className="flex flex-col space-y-3 w-full">
                    <SignUpComponent />
                </div>
            </div>
        </div>
    )
}
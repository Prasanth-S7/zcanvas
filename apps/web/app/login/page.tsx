export default function Login() {
    return (
        <div className="min-h-screen bg-cyan-50 text-black flex w-screen justify-center items-center">
            <div className="border border-black/20 flex flex-col space-y-12 w-96 px-3 py-5 rounded-xl">
                <div className="w-full text-center text-2xl font-semibold">Enter into zCanvas</div>
                <div className="flex flex-col space-y-3 w-full">
                    <button className="border border-white/10 p-3 rounded-xl bg-gradient-to-t from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">Sign Up</button>
                    <button className="border border-white/10 p-3 rounded-xl bg-gradient-to-t from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">Login</button>
                </div>
            </div>
        </div>
    )
}
import { MessageSquare, Users, Plus, History } from 'lucide-react';
import JoinNow from '../../components/JoinNow';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="container mx-auto px-6 py-16">
                <header className="mb-16 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Chat Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Connect with others in real-time chat rooms. Join existing rooms or create your own space.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
                        <JoinNow />
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
                        <div className="flex flex-col space-y-6 items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Create New Room</h2>
                            <button className="w-full max-w-md bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors duration-200">
                                <Plus size={20} />
                                <span>Create Room</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                                <MessageSquare className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Active Chats</h3>
                                <p className="text-gray-600">5 rooms</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                                <Users className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Online Users</h3>
                                <p className="text-gray-600">12 users</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                                <History className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Recent Rooms</h3>
                                <p className="text-gray-600">View history</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
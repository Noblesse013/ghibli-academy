import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  BarChart3, 
  Clock, 
  Users,
  Bell,
  User,
  Plus,
  X,
  Edit,
  Send,
  Save,
  MessageCircle,
  Moon,
  Sun,
  Trash
} from 'lucide-react';

export default function App() {
  // User Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Chihiro Ogino',
    year: '3rd Year',
    major: 'Magical Arts',
    spirit: 'Water Dragon'
  });
  const [editableProfile, setEditableProfile] = useState(profile);

  // Classes State
  const [classes, setClasses] = useState([
    { name: 'Magical Botany', room: '101', time: '9:00 AM' },
    { name: 'Spirit Communication', room: '102', time: '11:00 AM' },
    { name: 'Advanced Spellcasting', room: '103', time: '2:00 PM' }
  ]);
  const [newClass, setNewClass] = useState({ name: '', room: '', time: '' });
  const [isAddingClass, setIsAddingClass] = useState(false);

  // Events State
  const [events, setEvents] = useState([
    { title: 'Forest Spirit Festival', date: 'March 15', attendees: 156 },
    { title: 'Potion Making Contest', date: 'March 20', attendees: 89 },
    { title: 'Spring Equinox Ceremony', date: 'March 21', attendees: 234 }
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', attendees: 0 });
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Deadlines State
  const [deadlines, setDeadlines] = useState([
    { task: 'Herbology Essay', due: 'March 18', subject: 'Magical Botany' },
    { task: 'Spirit Summoning Practice', due: 'March 22', subject: 'Spirit Communication' }
  ]);
  const [newDeadline, setNewDeadline] = useState({ task: '', due: '', subject: '' });
  const [isAddingDeadline, setIsAddingDeadline] = useState(false);

  // Totoro Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Totoro, your magical assistant! How can I help you today?", isBot: true }
  ]);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  // Profile Handlers
  const handleProfileSave = () => {
    setProfile(editableProfile);
    setIsEditingProfile(false);
  };

  // Class Handlers
  const handleAddClass = () => {
    if (newClass.name && newClass.room && newClass.time) {
      setClasses([...classes, newClass]);
      setNewClass({ name: '', room: '', time: '' });
      setIsAddingClass(false);
    }
  };

  const handleDeleteClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  // Event Handlers
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.attendees > 0) {
      setEvents([...events, newEvent]);
      setNewEvent({ title: '', date: '', attendees: 0 });
      setIsAddingEvent(false);
    }
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  // Deadline Handlers
  const handleAddDeadline = () => {
    if (newDeadline.task && newDeadline.due && newDeadline.subject) {
      setDeadlines([...deadlines, newDeadline]);
      setNewDeadline({ task: '', due: '', subject: '' });
      setIsAddingDeadline(false);
    }
  };

  const handleDeleteDeadline = (index: number) => {
    setDeadlines(deadlines.filter((_, i) => i !== index));
  };

  // Chat Handlers
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isBot: false }]);
      
      // Simulate Totoro's response
      setTimeout(() => {
        const lowerCaseMessage = newMessage.toLowerCase();
        let randomResponse = "I'm not sure how to help with that.";

        if (lowerCaseMessage.includes("class")) {
          randomResponse = classes.length > 0 
            ? `You have the following classes today: ${classes.map(cls => cls.name).join(', ')}.`
            : "You don't have any classes scheduled for today.";
        } else if (lowerCaseMessage.includes("deadline")) {
          randomResponse = deadlines.length > 0 
            ? `Your upcoming deadlines are: ${deadlines.map(dl => `${dl.task} due on ${dl.due}`).join(', ')}.`
            : "You have no upcoming deadlines.";
        } else if (lowerCaseMessage.includes("event")) {
          randomResponse = events.length > 0 
            ? `Upcoming events include: ${events.map(event => event.title).join(', ')}.`
            : "There are no upcoming events.";
        } else {
          const responses = {
            "help": "I can help you find your way around the academy!",
            "plants": "Remember to take care of your magical plants!",
            "weather": "Would you like to hear about today's weather in the Spirit Realm?",
            "spells": "Don't forget to practice your spells!",
            "classes": "You have classes scheduled today. Check your timetable!",
            "events": "There are some exciting events coming up soon!",
          };

          const response = Object.keys(responses).find(key => lowerCaseMessage.includes(key));
          randomResponse = response ? responses[response as keyof typeof responses] : randomResponse;
        }

        setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f3ef] text-[#2c4a3d]'}`}>
      <header className={`${isDarkMode ? 'bg-[#4a5d53]' : 'bg-[#7c9b88]'} p-4 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-semibold text-white">Ghibli Academy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleToggleDarkMode}>
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-white" />
              ) : (
                <Moon className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#e8d3a3] flex items-center justify-center">
                <User className="h-5 w-5 text-[#7c9b88]" />
              </div>
              <span className="text-white hidden sm:inline">{profile.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Hero Section with Profile */}
        <div className={`mb-8 ${isDarkMode ? 'bg-[#2a3a31]' : 'bg-[#d4e4d9]'} rounded-lg p-6 shadow-md`}>
          <div className="relative overflow-hidden rounded-lg mb-6">
            <img 
              src="https://i.pinimg.com/736x/4b/98/a0/4b98a0da4cc43c61fa747614127733d4.jpg" 
              alt="Campus" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c9b88]/80 to-transparent p-6 flex items-end">
              <div>
                <h2 className="text-white text-2xl font-bold mb-2">Welcome back, {profile.name}!</h2>
                <p className="text-white/90">Your magical learning journey continues</p>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className={`${isDarkMode ? 'bg-[#2c3e36]' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>Student Profile</h3>
              {isEditingProfile ? (
                <Save 
                  className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'} cursor-pointer`} 
                  onClick={handleProfileSave}
                />
              ) : (
                <Edit 
                  className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'} cursor-pointer`} 
                  onClick={() => setIsEditingProfile(true)}
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {isEditingProfile ? (
                <>
                  <input
                    className={`p-2 border rounded ${
                      isDarkMode ? 'bg-[#1a2a22] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={editableProfile.name}
                    onChange={(e) => setEditableProfile({...editableProfile, name: e.target.value})}
                    placeholder="Name"
                  />
                  <input
                    className={`p-2 border rounded ${
                      isDarkMode ? 'bg-[#1a2a22] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={editableProfile.year}
                    onChange={(e) => setEditableProfile({...editableProfile, year: e.target.value})}
                    placeholder="Year"
                  />
                  <input
                    className={`p-2 border rounded ${
                      isDarkMode ? 'bg-[#1a2a22] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={editableProfile.major}
                    onChange={(e) => setEditableProfile({...editableProfile, major: e.target.value})}
                    placeholder="Major"
                  />
                  <input
                    className={`p-2 border rounded ${
                      isDarkMode ? 'bg-[#1a2a22] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={editableProfile.spirit}
                    onChange={(e) => setEditableProfile({...editableProfile, spirit: e.target.value})}
                    placeholder="Guardian Spirit"
                  />
                </>
              ) : (
                <>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Year</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>{profile.year}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Major</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>{profile.major}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Guardian Spirit</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>{profile.spirit}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className={`${isDarkMode ? 'bg-[#2c3e36]' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>Today's Classes</h3>
              <div className="flex items-center space-x-2">
                <Clock className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'}`} />
                <Plus 
                  className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'} cursor-pointer`} 
                  onClick={() => setIsAddingClass(true)}
                />
              </div>
            </div>
            <div className="space-y-4">
              {classes.map((cls, index) => (
                <div key={index} className={`flex items-center justify-between p-3 ${
                  isDarkMode ? 'bg-[#1a2a22]' : 'bg-[#f5f3ef]'
                } rounded-md`}>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>{cls.name}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Room {cls.room} • {cls.time}</p>
                  </div>
                  <Trash 
                    className="h-4 w-4 text-red-500 cursor-pointer" 
                    onClick={() => handleDeleteClass(index)} 
                  />
                </div>
              ))}
              {isAddingClass && (
                <div className={`space-y-2 p-3 ${isDarkMode ? 'bg-[#1a2a22]' : 'bg-[#f5f3ef]'} rounded-md`}>
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    placeholder="Class Name"
                  />
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newClass.room}
                    onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    placeholder="Room Number"
                  />
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    placeholder="Time"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-3 py-1 bg-[#7c9b88] text-white rounded"
                      onClick={handleAddClass}
                    >
                      Add
                    </button>
                    <button
                      className={`px-3 py-1 ${
                        isDarkMode ? 'bg-[#4a5d53] text-white' : 'bg-gray-300 text-[#2c4a3d]'
                      } rounded`}
                      onClick={() => setIsAddingClass(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className={`${isDarkMode ? 'bg-[#2c3e36]' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>Upcoming Events</h3>
              <div className="flex items-center space-x-2">
                <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'}`} />
                <Plus 
                  className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'} cursor-pointer`} 
                  onClick={() => setIsAddingEvent(true)}
                />
              </div>
            </div>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className={`flex items-center justify-between p-3 ${
                  isDarkMode ? 'bg-[#1a2a22]' : 'bg-[#f5f3ef]'
                } rounded-md`}>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>{event.title}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.date}</p>
                  </div>
                  <div className={`flex items-center text-sm ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'}`}>
                    <Users className="h-4 w-4 mr-1" />
                    {event.attendees}
                    <Trash 
                      className="h-4 w-4 ml-2 text-red-500 cursor-pointer" 
                      onClick={() => handleDeleteEvent(index)} 
                    />
                  </div>
                </div>
              ))}
              {isAddingEvent && (
                <div className={`space-y-2 p-3 ${isDarkMode ? 'bg-[#1a2a22]' : 'bg-[#f5f3ef]'} rounded-md`}>
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Event Title"
                  />
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    placeholder="Date"
                  />
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    type="number"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({...newEvent, attendees: parseInt(e.target.value)})}
                    placeholder="Expected Attendees"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-3 py-1 bg-[#7c9b88] text-white rounded"
                      onClick={handleAddEvent}
                    >
                      Add
                    </button>
                    <button
                      className={`px-3 py-1 ${
                        isDarkMode ? 'bg-[#4a5d53] text-white' : 'bg-gray-300 text-[#2c4a3d]'
                      } rounded`}
                      onClick={() => setIsAddingEvent(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deadlines */}
          <div className={`${isDarkMode ? 'bg-[#2c3e36]' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>Upcoming Deadlines</h3>
              <Plus 
                className={`h-5 w-5 ${isDarkMode ? 'text-[#a0c1ab]' : 'text-[#7c9b88]'} cursor-pointer`} 
                onClick={() => setIsAddingDeadline(true)}
              />
            </div>
            <div className="space-y-4">
              {deadlines.map((deadline, index) => (
                <div key={index} className={`flex justify-between p-3 ${
                  isDarkMode ? 'bg-[#1a2a22]' : 'bg-[#f5f3ef]'
                } rounded-md`}>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#2c4a3d]'}`}>{deadline.task}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {deadline.subject} • Due {deadline.due}
                    </p>
                  </div>
                  <Trash 
                    className="h-4 w-4 text-red-500 cursor-pointer" 
                    onClick={() => handleDeleteDeadline(index)} 
                  />
                </div>
              ))}
              {isAddingDeadline && (
                <div className={`space-y-2 p-3 ${isDarkMode ? 'bg-[#1a2a22]' : 'bg-[#f5f3ef]'} rounded-md`}>
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newDeadline.task}
                    onChange={(e) => setNewDeadline({...newDeadline, task: e.target.value})}
                    placeholder="Task Name"
                  />
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newDeadline.subject}
                    onChange={(e) => setNewDeadline({...newDeadline, subject: e.target.value})}
                    placeholder="Subject"
                  />
                  <input
                    className={`w-full p-2 border rounded ${
                      isDarkMode ? 'bg-[#2c3e36] border-[#4a5d53] text-white' : 'bg-white text-[#2c4a3d]'
                    }`}
                    value={newDeadline.due}
                    onChange={(e) => setNewDeadline({...newDeadline, due: e.target.value})}
                    placeholder="Due Date"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-3 py-1 bg-[#7c9b88] text-white rounded"
                      onClick={handleAddDeadline}
                    >
                      Add
                    </button>
                    <button
                      className={`px-3 py-1 ${
                        isDarkMode ? 'bg-[#4a5d53] text-white' : 'bg-gray-300 text-[#2c4a3d]'
                      } rounded`}
                      onClick={() => setIsAddingDeadline(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Totoro Chat */}
      <div className={`fixed bottom-4 right-4 transition-all duration-300 ${isChatOpen ? 'w-80' : 'w-auto'}`}>
        {isChatOpen ? (
          <div className={`${isDarkMode ? 'bg-[#2c3e36]' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
            <div className="bg-[#7c9b88] p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=100&h=100&fit=crop" 
                  alt="Totoro"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-white font-medium">Totoro Helper</span>
              </div>
              <X 
                className="h-5 w-5 text-white cursor-pointer" 
                onClick={() => setIsChatOpen(false)}
              />
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot 
                      ? (isDarkMode ? 'bg-[#1a2a22] text-white' : 'bg-[#f5f3ef] text-[#2c4a3d]')
                      : 'bg-[#7c9b88] text-white'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className={`p-4 border-t ${isDarkMode ? 'border-[#4a5d53]' : ''}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Totoro..."
                  className={`flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#7c9b88] ${
                    isDarkMode ? 'bg-[#1a2a22] border-[#4a5d53] text-white placeholder-gray-400' : 
                    'bg-white border-gray-200 text-[#2c4a3d]'
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#7c9b88] text-white rounded-lg"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-[#7c9b88] text-white p-4 rounded-full shadow-lg hover:bg-[#6b8a77] transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
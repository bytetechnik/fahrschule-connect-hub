import { mockTeachers } from './teachers';
import { mockStudents } from './students';

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  read: boolean;
}

const MESSAGES_STORAGE_KEY = 'fahrschule_messages';
const CONVERSATIONS_STORAGE_KEY = 'fahrschule_conversations';

export const mockConversations: Conversation[] = [
  { id: 'conv-1', participants: ['admin', 'teacher-1'], lastMessage: 'Bitte aktualisieren Sie den Stundenplan für nächste Woche.', lastMessageAt: '2025-12-24T10:30:00Z', unreadCount: 1 },
  { id: 'conv-2', participants: ['admin', 'student-1'], lastMessage: 'Ihre Prüfung wurde bestätigt.', lastMessageAt: '2025-12-24T09:15:00Z', unreadCount: 0 },
  { id: 'conv-3', participants: ['teacher-1', 'student-1'], lastMessage: 'Wie war die letzte Fahrstunde?', lastMessageAt: '2025-12-23T16:00:00Z', unreadCount: 2 },
  { id: 'conv-4', participants: ['teacher-1', 'student-2'], lastMessage: 'Der Termin für morgen wurde bestätigt.', lastMessageAt: '2025-12-23T14:30:00Z', unreadCount: 0 },
  { id: 'conv-5', participants: ['admin', 'teacher-2'], lastMessage: 'Ein neuer Fahrschüler wurde Ihnen zugewiesen.', lastMessageAt: '2025-12-22T11:00:00Z', unreadCount: 1 },
  { id: 'conv-6', participants: ['teacher-2', 'student-3'], lastMessage: 'Gut gemacht in der Theoriestunde!', lastMessageAt: '2025-12-22T15:45:00Z', unreadCount: 0 },
];

export const mockMessages: Message[] = [
  // Conversation 1: admin <-> teacher-1
  { id: 'msg-1', conversationId: 'conv-1', senderId: 'admin', senderName: 'Admin', content: 'Guten Tag Herr Müller, könnten Sie bitte den Stundenplan aktualisieren?', createdAt: '2025-12-24T10:00:00Z', read: true },
  { id: 'msg-2', conversationId: 'conv-1', senderId: 'teacher-1', senderName: 'Max Müller', content: 'Ja, gerne. Ich erledige das noch heute.', createdAt: '2025-12-24T10:15:00Z', read: true },
  { id: 'msg-3', conversationId: 'conv-1', senderId: 'admin', senderName: 'Admin', content: 'Bitte aktualisieren Sie den Stundenplan für nächste Woche.', createdAt: '2025-12-24T10:30:00Z', read: false },
  
  // Conversation 2: admin <-> student-1
  { id: 'msg-4', conversationId: 'conv-2', senderId: 'student-1', senderName: 'Anna Schmidt', content: 'Wann ist meine praktische Prüfung geplant?', createdAt: '2025-12-24T09:00:00Z', read: true },
  { id: 'msg-5', conversationId: 'conv-2', senderId: 'admin', senderName: 'Admin', content: 'Ihre praktische Prüfung wurde für den 28. Dezember um 09:00 Uhr bestätigt.', createdAt: '2025-12-24T09:15:00Z', read: true },
  
  // Conversation 3: teacher-1 <-> student-1
  { id: 'msg-6', conversationId: 'conv-3', senderId: 'teacher-1', senderName: 'Max Müller', content: 'Guten Tag Anna, wie lief die Fahrstunde gestern?', createdAt: '2025-12-23T14:00:00Z', read: true },
  { id: 'msg-7', conversationId: 'conv-3', senderId: 'student-1', senderName: 'Anna Schmidt', content: 'Sehr gut! Ich fühle mich beim Einparken jetzt sicherer.', createdAt: '2025-12-23T15:00:00Z', read: true },
  { id: 'msg-8', conversationId: 'conv-3', senderId: 'teacher-1', senderName: 'Max Müller', content: 'Das freut mich zu hören. Wie war die letzte Fahrstunde insgesamt?', createdAt: '2025-12-23T16:00:00Z', read: false },
  
  // Conversation 4: teacher-1 <-> student-2
  { id: 'msg-9', conversationId: 'conv-4', senderId: 'student-2', senderName: 'Lucas Weber', content: 'Können wir den Termin auf 10:00 Uhr verschieben?', createdAt: '2025-12-23T13:00:00Z', read: true },
  { id: 'msg-10', conversationId: 'conv-4', senderId: 'teacher-1', senderName: 'Max Müller', content: 'Ja, das ist möglich. Der Termin für morgen um 10:00 Uhr wurde bestätigt.', createdAt: '2025-12-23T14:30:00Z', read: true },
  
  // Conversation 5: admin <-> teacher-2
  { id: 'msg-11', conversationId: 'conv-5', senderId: 'admin', senderName: 'Admin', content: 'Ein neuer Fahrschüler wurde Ihnen zugewiesen.', createdAt: '2025-12-22T11:00:00Z', read: false },
  
  // Conversation 6: teacher-2 <-> student-3
  { id: 'msg-12', conversationId: 'conv-6', senderId: 'teacher-2', senderName: 'Julia Schneider', content: 'Gut gemacht in der Theoriestunde! Weiter so!', createdAt: '2025-12-22T15:45:00Z', read: true },
];

const getStoredConversations = (): Conversation[] => {
  const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockConversations;
};

const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
};

const getStoredMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockMessages;
};

const saveMessages = (messages: Message[]) => {
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
};

export const getConversationsForUser = (userId: string): Conversation[] => {
  const conversations = getStoredConversations();
  return conversations
    .filter(c => c.participants.includes(userId))
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
};

export const getMessagesForConversation = (conversationId: string): Message[] => {
  const messages = getStoredMessages();
  return messages
    .filter(m => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const sendMessage = (conversationId: string, senderId: string, senderName: string, content: string): Message => {
  const messages = getStoredMessages();
  const conversations = getStoredConversations();
  
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId,
    senderName,
    content,
    createdAt: new Date().toISOString(),
    read: false,
  };
  
  messages.push(newMessage);
  saveMessages(messages);
  
  // Update conversation
  const convIndex = conversations.findIndex(c => c.id === conversationId);
  if (convIndex !== -1) {
    conversations[convIndex].lastMessage = content;
    conversations[convIndex].lastMessageAt = newMessage.createdAt;
    // Increment unread for other participants
    const otherParticipant = conversations[convIndex].participants.find(p => p !== senderId);
    if (otherParticipant) {
      conversations[convIndex].unreadCount += 1;
    }
    saveConversations(conversations);
  }
  
  return newMessage;
};

export const markConversationAsRead = (conversationId: string, userId: string) => {
  const messages = getStoredMessages();
  const conversations = getStoredConversations();
  
  // Mark messages as read
  messages.forEach(m => {
    if (m.conversationId === conversationId && m.senderId !== userId) {
      m.read = true;
    }
  });
  saveMessages(messages);
  
  // Reset unread count
  const convIndex = conversations.findIndex(c => c.id === conversationId);
  if (convIndex !== -1) {
    conversations[convIndex].unreadCount = 0;
    saveConversations(conversations);
  }
};

export const createConversation = (participant1: string, participant2: string): Conversation => {
  const conversations = getStoredConversations();
  
  // Check if conversation already exists
  const existing = conversations.find(c => 
    c.participants.includes(participant1) && c.participants.includes(participant2)
  );
  if (existing) return existing;
  
  const newConversation: Conversation = {
    id: `conv-${Date.now()}`,
    participants: [participant1, participant2],
    lastMessage: '',
    lastMessageAt: new Date().toISOString(),
    unreadCount: 0,
  };
  
  conversations.push(newConversation);
  saveConversations(conversations);
  return newConversation;
};

export const getParticipantInfo = (participantId: string): { name: string; role: string } => {
  if (participantId === 'admin') {
    return { name: 'Administrator', role: 'admin' };
  }
  const teacher = mockTeachers.find(t => t.id === participantId);
  if (teacher) {
    return { name: teacher.name, role: 'teacher' };
  }
  const student = mockStudents.find(s => s.id === participantId);
  if (student) {
    return { name: student.name, role: 'student' };
  }
  return { name: 'Unknown', role: 'unknown' };
};

export const getUnreadMessageCount = (userId: string): number => {
  const conversations = getConversationsForUser(userId);
  return conversations.reduce((sum, c) => sum + c.unreadCount, 0);
};

// Online Status System
const ONLINE_STATUS_STORAGE_KEY = 'fahrschule_online_status';
const TYPING_STATUS_STORAGE_KEY = 'fahrschule_typing_status';

export interface OnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface TypingStatus {
  conversationId: string;
  userId: string;
  isTyping: boolean;
  timestamp: string;
}

// Simulated online users (in a real app, this would come from the server)
const getStoredOnlineStatus = (): OnlineStatus[] => {
  const stored = localStorage.getItem(ONLINE_STATUS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with some mock online statuses
  const initialStatus: OnlineStatus[] = [
    { userId: 'admin', isOnline: true, lastSeen: new Date().toISOString() },
    { userId: 'teacher-1', isOnline: true, lastSeen: new Date().toISOString() },
    { userId: 'teacher-2', isOnline: false, lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
    { userId: 'teacher-3', isOnline: false, lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { userId: 'student-1', isOnline: true, lastSeen: new Date().toISOString() },
    { userId: 'student-2', isOnline: false, lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
    { userId: 'student-3', isOnline: true, lastSeen: new Date().toISOString() },
    { userId: 'student-4', isOnline: false, lastSeen: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
    { userId: 'student-5', isOnline: false, lastSeen: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
    { userId: 'student-6', isOnline: true, lastSeen: new Date().toISOString() },
  ];
  localStorage.setItem(ONLINE_STATUS_STORAGE_KEY, JSON.stringify(initialStatus));
  return initialStatus;
};

const saveOnlineStatus = (statuses: OnlineStatus[]) => {
  localStorage.setItem(ONLINE_STATUS_STORAGE_KEY, JSON.stringify(statuses));
};

export const getUserOnlineStatus = (userId: string): OnlineStatus | null => {
  const statuses = getStoredOnlineStatus();
  return statuses.find(s => s.userId === userId) || null;
};

export const setUserOnline = (userId: string) => {
  const statuses = getStoredOnlineStatus();
  const index = statuses.findIndex(s => s.userId === userId);
  const newStatus: OnlineStatus = {
    userId,
    isOnline: true,
    lastSeen: new Date().toISOString(),
  };
  
  if (index !== -1) {
    statuses[index] = newStatus;
  } else {
    statuses.push(newStatus);
  }
  saveOnlineStatus(statuses);
};

export const setUserOffline = (userId: string) => {
  const statuses = getStoredOnlineStatus();
  const index = statuses.findIndex(s => s.userId === userId);
  
  if (index !== -1) {
    statuses[index].isOnline = false;
    statuses[index].lastSeen = new Date().toISOString();
    saveOnlineStatus(statuses);
  }
};

// Typing indicators
const getStoredTypingStatus = (): TypingStatus[] => {
  const stored = localStorage.getItem(TYPING_STATUS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveTypingStatus = (statuses: TypingStatus[]) => {
  localStorage.setItem(TYPING_STATUS_STORAGE_KEY, JSON.stringify(statuses));
};

export const setTypingStatus = (conversationId: string, userId: string, isTyping: boolean) => {
  let statuses = getStoredTypingStatus();
  
  // Remove old typing status for this user in this conversation
  statuses = statuses.filter(s => !(s.conversationId === conversationId && s.userId === userId));
  
  if (isTyping) {
    statuses.push({
      conversationId,
      userId,
      isTyping: true,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Clean up old typing statuses (older than 5 seconds)
  const fiveSecondsAgo = Date.now() - 5000;
  statuses = statuses.filter(s => new Date(s.timestamp).getTime() > fiveSecondsAgo);
  
  saveTypingStatus(statuses);
};

export const getTypingUsers = (conversationId: string, excludeUserId: string): string[] => {
  const statuses = getStoredTypingStatus();
  const fiveSecondsAgo = Date.now() - 5000;
  
  return statuses
    .filter(s => 
      s.conversationId === conversationId && 
      s.userId !== excludeUserId &&
      s.isTyping &&
      new Date(s.timestamp).getTime() > fiveSecondsAgo
    )
    .map(s => {
      const info = getParticipantInfo(s.userId);
      return info.name;
    });
};

export const formatLastSeen = (lastSeen: string, language: 'de' | 'en'): string => {
  const date = new Date(lastSeen);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) {
    return language === 'de' ? 'Gerade eben' : 'Just now';
  } else if (diffMins < 60) {
    return language === 'de' 
      ? `vor ${diffMins} ${diffMins === 1 ? 'Minute' : 'Minuten'}`
      : `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return language === 'de'
      ? `vor ${diffHours} ${diffHours === 1 ? 'Stunde' : 'Stunden'}`
      : `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return language === 'de'
      ? `vor ${diffDays} ${diffDays === 1 ? 'Tag' : 'Tagen'}`
      : `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
};


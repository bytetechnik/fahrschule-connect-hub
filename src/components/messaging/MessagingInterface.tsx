import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Plus, MessageSquare, User, Users, UserCog, Circle } from 'lucide-react';
import { 
  getConversationsForUser, 
  getMessagesForConversation, 
  sendMessage, 
  markConversationAsRead,
  createConversation,
  getParticipantInfo,
  mockTeachers,
  mockStudents,
  Conversation,
  Message,
  getUserOnlineStatus,
  setUserOnline,
  setTypingStatus,
  getTypingUsers,
  formatLastSeen,
} from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface MessagingInterfaceProps {
  userRole: 'admin' | 'teacher' | 'student';
}

const MessagingInterface = ({ userRole }: MessagingInterfaceProps) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [onlineStatuses, setOnlineStatuses] = useState<Map<string, { isOnline: boolean; lastSeen: string }>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userId = user?.id || (userRole === 'admin' ? 'admin' : '');

  // Set current user as online and update periodically
  useEffect(() => {
    if (userId) {
      setUserOnline(userId);
      const interval = setInterval(() => setUserOnline(userId), 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadConversations();
    }
  }, [userId]);

  // Poll for typing indicators and online status
  useEffect(() => {
    const updateStatuses = () => {
      if (selectedConversation) {
        const typingNames = getTypingUsers(selectedConversation.id, userId);
        setTypingUsers(typingNames);
      }
      
      // Update online statuses for all participants
      const newStatuses = new Map<string, { isOnline: boolean; lastSeen: string }>();
      conversations.forEach(conv => {
        conv.participants.forEach(participantId => {
          if (!newStatuses.has(participantId)) {
            const status = getUserOnlineStatus(participantId);
            if (status) {
              newStatuses.set(participantId, { isOnline: status.isOnline, lastSeen: status.lastSeen });
            }
          }
        });
      });
      setOnlineStatuses(newStatuses);
    };

    updateStatuses();
    const interval = setInterval(updateStatuses, 2000);
    return () => clearInterval(interval);
  }, [selectedConversation, conversations, userId]);

  useEffect(() => {
    if (selectedConversation) {
      const msgs = getMessagesForConversation(selectedConversation.id);
      setMessages(msgs);
      markConversationAsRead(selectedConversation.id, userId);
      loadConversations();
    }
  }, [selectedConversation?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = () => {
    const convs = getConversationsForUser(userId);
    setConversations(convs);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = useCallback(() => {
    if (!selectedConversation) return;
    
    setTypingStatus(selectedConversation.id, userId, true);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing indicator after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      if (selectedConversation) {
        setTypingStatus(selectedConversation.id, userId, false);
      }
    }, 3000);
  }, [selectedConversation, userId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Clear typing indicator
    setTypingStatus(selectedConversation.id, userId, false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const senderName = user?.name || 'Admin';
    sendMessage(selectedConversation.id, userId, senderName, newMessage.trim());
    
    // Refresh messages and conversations
    setMessages(getMessagesForConversation(selectedConversation.id));
    loadConversations();
    setNewMessage('');
    
    toast({
      title: t('success'),
      description: t('messageSent'),
    });
  };

  const getOtherParticipantId = (conversation: Conversation): string | undefined => {
    return conversation.participants.find(p => p !== userId);
  };

  const getOnlineStatusForParticipant = (participantId: string) => {
    return onlineStatuses.get(participantId);
  };

  const handleCreateConversation = () => {
    if (!selectedRecipient) return;

    const newConv = createConversation(userId, selectedRecipient);
    loadConversations();
    setSelectedConversation(newConv);
    setIsNewConversationOpen(false);
    setSelectedRecipient('');
  };

  const getOtherParticipant = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(p => p !== userId);
    return otherParticipantId ? getParticipantInfo(otherParticipantId) : null;
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return date.toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return t('yesterday');
    }
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', { day: '2-digit', month: 'short' });
  };

  const getAvailableRecipients = () => {
    const recipients: { id: string; name: string; role: string }[] = [];
    
    if (userRole === 'admin') {
      mockTeachers.forEach(t => recipients.push({ id: t.id, name: t.name, role: 'teacher' }));
      mockStudents.forEach(s => recipients.push({ id: s.id, name: s.name, role: 'student' }));
    } else if (userRole === 'teacher') {
      recipients.push({ id: 'admin', name: 'Administrator', role: 'admin' });
      const myStudents = mockStudents.filter(s => s.teacherId === userId);
      myStudents.forEach(s => recipients.push({ id: s.id, name: s.name, role: 'student' }));
    } else if (userRole === 'student') {
      recipients.push({ id: 'admin', name: 'Administrator', role: 'admin' });
      const myTeacher = mockTeachers.find(t => t.id === user?.assignedTeacher);
      if (myTeacher) {
        recipients.push({ id: myTeacher.id, name: myTeacher.name, role: 'teacher' });
      }
    }
    
    // Filter out existing conversations
    const existingParticipants = conversations.flatMap(c => c.participants);
    return recipients.filter(r => !existingParticipants.includes(r.id) || r.id === userId);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <UserCog className="h-4 w-4" />;
      case 'teacher': return <User className="h-4 w-4" />;
      case 'student': return <Users className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      {/* Conversations List */}
      <Card className="w-80 shrink-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t('messages')}</CardTitle>
            <Dialog open={isNewConversationOpen} onOpenChange={setIsNewConversationOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('startConversation')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium">{t('selectRecipient')}</label>
                    <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={t('selectRecipient')} />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableRecipients().map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            <div className="flex items-center gap-2">
                              {getRoleIcon(r.role)}
                              <span>{r.name}</span>
                              <Badge variant="secondary" className="text-xs">{r.role}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateConversation} disabled={!selectedRecipient} className="w-full">
                    {t('startConversation')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-18rem)]">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>{t('noConversations')}</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {conversations.map((conv) => {
                  const otherParticipant = getOtherParticipant(conv);
                  const otherParticipantId = getOtherParticipantId(conv);
                  const status = otherParticipantId ? getOnlineStatusForParticipant(otherParticipantId) : null;
                  const isOnline = status?.isOnline || false;
                  const isSelected = selectedConversation?.id === conv.id;
                  
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {otherParticipant?.name.charAt(0) || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <Circle 
                            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 ${
                              isOnline ? 'text-green-500 fill-green-500' : 'text-muted-foreground fill-muted-foreground'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{otherParticipant?.name || 'Unknown'}</p>
                            {conv.unreadCount > 0 && (
                              <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          <p className="text-xs text-muted-foreground">{formatMessageTime(conv.lastMessageAt)}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getOtherParticipant(selectedConversation)?.name.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  {(() => {
                    const otherId = getOtherParticipantId(selectedConversation);
                    const status = otherId ? getOnlineStatusForParticipant(otherId) : null;
                    return (
                      <Circle 
                        className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 ${
                          status?.isOnline ? 'text-green-500 fill-green-500' : 'text-muted-foreground fill-muted-foreground'
                        }`}
                      />
                    );
                  })()}
                </div>
                <div>
                  <CardTitle className="text-base">{getOtherParticipant(selectedConversation)?.name}</CardTitle>
                  {(() => {
                    const otherId = getOtherParticipantId(selectedConversation);
                    const status = otherId ? getOnlineStatusForParticipant(otherId) : null;
                    if (status?.isOnline) {
                      return <p className="text-sm text-green-600">{t('online')}</p>;
                    }
                    if (status?.lastSeen) {
                      return (
                        <p className="text-sm text-muted-foreground">
                          {t('lastSeen')} {formatLastSeen(status.lastSeen, language)}
                        </p>
                      );
                    }
                    return <p className="text-sm text-muted-foreground capitalize">{getOtherParticipant(selectedConversation)?.role}</p>;
                  })()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isOwnMessage = msg.senderId === userId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            isOwnMessage
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {formatMessageTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Typing Indicator */}
              {typingUsers.length > 0 && (
                <div className="px-4 py-2 text-sm text-muted-foreground italic animate-pulse">
                  {typingUsers.length === 1 
                    ? `${typingUsers[0]} ${t('isTyping')}`
                    : `${typingUsers.join(', ')} ${t('areTyping')}`
                  }
                </div>
              )}
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
                    placeholder={t('typeMessage')}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t('selectConversation')}</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default MessagingInterface;
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const services = [
    {
      title: 'Социальные выплаты',
      description: 'Назначение и выплата пособий, компенсаций и других мер социальной поддержки',
      icon: 'Wallet'
    },
    {
      title: 'Социальное обслуживание',
      description: 'Предоставление социальных услуг на дому и в стационарных учреждениях',
      icon: 'Heart'
    },
    {
      title: 'Льготы и субсидии',
      description: 'Оформление льгот на оплату ЖКХ, проезд и другие меры поддержки',
      icon: 'Receipt'
    },
    {
      title: 'Реабилитация инвалидов',
      description: 'Индивидуальные программы реабилитации и абилитации',
      icon: 'Accessibility'
    },
    {
      title: 'Поддержка семей',
      description: 'Материнский капитал, пособия на детей, помощь многодетным семьям',
      icon: 'Users'
    },
    {
      title: 'Ветеранам и труженикам',
      description: 'Меры социальной поддержки ветеранов войны и труда',
      icon: 'Award'
    }
  ];

  const news = [
    {
      date: '15 ноября 2025',
      title: 'Увеличены размеры социальных выплат',
      description: 'С 1 ноября повышены размеры ежемесячных денежных выплат для всех категорий граждан'
    },
    {
      date: '10 ноября 2025',
      title: 'График приема граждан в праздничные дни',
      description: 'Опубликован график работы учреждения в период предстоящих праздников'
    },
    {
      date: '5 ноября 2025',
      title: 'Новые меры поддержки для семей с детьми',
      description: 'Утверждены дополнительные выплаты семьям с детьми до 3 лет'
    }
  ];

  const documents = [
    {
      category: 'Нормативные акты',
      items: [
        'Федеральный закон №442-ФЗ "Об основах социального обслуживания"',
        'Закон РД "О социальной поддержке населения"',
        'Положение об Управлении социальной защиты населения'
      ]
    },
    {
      category: 'Формы заявлений',
      items: [
        'Заявление на назначение пособия',
        'Заявление на предоставление субсидии',
        'Заявление на социальное обслуживание'
      ]
    }
  ];

  const handleFeedbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string
    };

    try {
      const response = await fetch('https://functions.poehali.dev/27c638fb-d062-4468-99d9-095085ddd0ed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        toast({ title: 'Успешно!', description: result.message });
        e.currentTarget.reset();
      } else {
        toast({ title: 'Ошибка', description: result.error || 'Не удалось отправить обращение', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить обращение', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppointmentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get('full_name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      service_type: formData.get('service_type') as string,
      preferred_date: formData.get('preferred_date') as string,
      preferred_time: formData.get('preferred_time') as string,
      additional_info: formData.get('additional_info') as string
    };

    try {
      const response = await fetch('https://functions.poehali.dev/600741cb-3c36-4c6d-aa14-e49247432047', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        toast({ title: 'Успешно!', description: result.message });
        e.currentTarget.reset();
      } else {
        toast({ title: 'Ошибка', description: result.error || 'Не удалось создать запись', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось создать запись', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-lg';
      case 'xlarge': return 'text-xl';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen ${isHighContrast ? 'bg-black text-yellow-300' : 'bg-gradient-to-b from-slate-50 to-white'} ${getFontSizeClass()}`}>
      <div className="bg-yellow-50 border-b border-yellow-200 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
          <span className="text-sm font-semibold">Версия для слабовидящих:</span>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={isHighContrast ? 'default' : 'outline'}
              onClick={() => setIsHighContrast(!isHighContrast)}
            >
              <Icon name="Eye" size={16} className="mr-2" />
              {isHighContrast ? 'Обычная версия' : 'Контрастная'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFontSize('normal')}
              className={fontSize === 'normal' ? 'bg-primary text-white' : ''}
            >
              А
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFontSize('large')}
              className={fontSize === 'large' ? 'bg-primary text-white' : ''}
            >
              <span className="text-lg">А</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFontSize('xlarge')}
              className={fontSize === 'xlarge' ? 'bg-primary text-white' : ''}
            >
              <span className="text-xl">А</span>
            </Button>
          </div>
        </div>
      </div>
      <header className={`${isHighContrast ? 'bg-black border-b-4 border-yellow-300' : 'bg-primary'} text-primary-foreground shadow-lg sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Icon name="Building2" size={32} className="text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                ГОСУДАРСТВЕННОЕ КАЗЕННОЕ УЧРЕЖДЕНИЕ РЕСПУБЛИКИ ДАГЕСТАН
              </h1>
              <p className="text-sm md:text-base opacity-90 mt-1">
                "УПРАВЛЕНИЕ СОЦИАЛЬНОЙ ЗАЩИТЫ НАСЕЛЕНИЯ В МО "ГОРОД ИЗБЕРБАШ"
              </p>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-2 mt-4">
            {[
              { id: 'main', label: 'Главная', icon: 'Home' },
              { id: 'about', label: 'О нас', icon: 'Info' },
              { id: 'services', label: 'Услуги', icon: 'Briefcase' },
              { id: 'news', label: 'Новости', icon: 'Newspaper' },
              { id: 'documents', label: 'Документы', icon: 'FileText' },
              { id: 'structure', label: 'Структура', icon: 'Network' },
              { id: 'antiterror', label: 'Антитеррор', icon: 'Shield' },
              { id: 'appointment', label: 'Запись на прием', icon: 'Calendar' },
              { id: 'contacts', label: 'Контакты', icon: 'Phone' }
            ].map(item => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className={isHighContrast ? 'text-yellow-300 hover:bg-yellow-300 hover:text-black border border-yellow-300' : 'text-white hover:bg-secondary hover:text-white'}
              >
                <Icon name={item.icon} size={16} className="mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'main' && (
          <div className="space-y-8 animate-fade-in">
            <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Социальная защита населения города Избербаш
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  Обеспечиваем поддержку и защиту прав граждан, нуждающихся в социальной помощи
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => setActiveSection('services')}
                  >
                    <Icon name="Briefcase" className="mr-2" />
                    Наши услуги
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                    onClick={() => setActiveSection('contacts')}
                  >
                    <Icon name="Phone" className="mr-2" />
                    Связаться с нами
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Newspaper" className="text-primary" />
                Последние новости
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {news.map((item, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2">
                        {item.date}
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Briefcase" className="text-primary" />
                Наши услуги
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all hover:scale-105">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                        <Icon name={service.icon} size={24} className="text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Info" className="text-primary" />
                  О нас
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Государственное казенное учреждение Республики Дагестан "Управление социальной защиты населения 
                  в муниципальном образовании "Город Избербаш" осуществляет государственную политику в сфере 
                  социальной защиты населения на территории города Избербаш.
                </p>
                
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Основные задачи учреждения:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>Предоставление мер социальной поддержки населению</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>Организация социального обслуживания граждан</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>Защита прав и законных интересов граждан</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>Работа с обращениями граждан</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'services' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Briefcase" className="text-primary" />
                  Государственные услуги
                </CardTitle>
                <CardDescription>
                  Полный перечень социальных услуг, предоставляемых гражданам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                            <Icon name={service.icon} size={20} className="text-primary" />
                          </div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <Button variant="outline" size="sm">
                          <Icon name="FileText" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'news' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Newspaper" className="text-primary" />
                  Новости и объявления
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Badge variant="secondary" className="mb-2">{item.date}</Badge>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'documents' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="FileText" className="text-primary" />
                  Документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {documents.map((doc, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {doc.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {doc.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2 p-3 hover:bg-muted rounded">
                              <Icon name="Download" size={18} className="text-primary" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'structure' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Network" className="text-primary" />
                  Структура учреждения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { position: 'Начальник управления', name: 'Иванов Иван Иванович' },
                    { position: 'Заместитель начальника', name: 'Петрова Анна Сергеевна' },
                    { position: 'Отдел социальных выплат', name: 'Сидоров Петр Алексеевич' },
                    { position: 'Отдел социального обслуживания', name: 'Смирнова Елена Викторовна' }
                  ].map((person, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon name="User" size={24} className="text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{person.position}</CardTitle>
                            <p className="text-muted-foreground">{person.name}</p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'antiterror' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Shield" className="text-accent" />
                  Антитеррористическая безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Icon name="AlertTriangle" className="text-accent" />
                    Телефоны экстренных служб
                  </h4>
                  <div className="space-y-2 text-lg">
                    <p><strong>МЧС России:</strong> 101, 112</p>
                    <p><strong>Полиция:</strong> 102</p>
                    <p><strong>Скорая помощь:</strong> 103</p>
                    <p><strong>Антитеррористическая горячая линия:</strong> 8-800-2000-112</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Порядок действий при обнаружении подозрительных предметов:</h4>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Не трогайте, не вскрывайте и не передвигайте находку</li>
                    <li>Зафиксируйте время обнаружения</li>
                    <li>Немедленно сообщите о находке в полицию</li>
                    <li>Организуйте охрану места обнаружения</li>
                    <li>Освободите опасную зону от людей</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'appointment' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Calendar" className="text-primary" />
                  Онлайн-запись на прием
                </CardTitle>
                <CardDescription>
                  Запишитесь на прием к специалисту в удобное время
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAppointmentSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">ФИО *</label>
                      <Input name="full_name" placeholder="Иванов Иван Иванович" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Телефон *</label>
                      <Input name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input name="email" type="email" placeholder="email@example.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Вид услуги *</label>
                    <select 
                      name="service_type" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Выберите услугу</option>
                      <option value="Социальные выплаты">Социальные выплаты</option>
                      <option value="Социальное обслуживание">Социальное обслуживание</option>
                      <option value="Льготы и субсидии">Льготы и субсидии</option>
                      <option value="Реабилитация инвалидов">Реабилитация инвалидов</option>
                      <option value="Поддержка семей">Поддержка семей</option>
                      <option value="Ветеранам и труженикам">Ветеранам и труженикам</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Желаемая дата *</label>
                      <Input name="preferred_date" type="date" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Желаемое время *</label>
                      <select 
                        name="preferred_time" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      >
                        <option value="">Выберите время</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Дополнительная информация</label>
                    <Textarea name="additional_info" placeholder="Укажите дополнительные сведения, если необходимо" rows={3} />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    <Icon name="Calendar" className="mr-2" size={18} />
                    {isSubmitting ? 'Отправка...' : 'Записаться на прием'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Контактная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Адрес:</p>
                        <p className="text-muted-foreground">
                          Республика Дагестан, г. Избербаш, ул. Ленина, д. 1
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Icon name="Phone" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Телефон:</p>
                        <p className="text-muted-foreground">+7 (87245) 2-00-00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Email:</p>
                        <p className="text-muted-foreground">uszn_izberbash@mail.ru</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">График работы:</p>
                        <p className="text-muted-foreground">
                          Пн-Пт: 9:00 - 18:00<br />
                          Обед: 13:00 - 14:00<br />
                          Сб-Вс: выходной
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="MessageSquare" className="text-primary" />
                    Обратная связь
                  </CardTitle>
                  <CardDescription>
                    Напишите нам, и мы ответим в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
                    <div>
                      <Input name="name" placeholder="Ваше имя" required />
                    </div>
                    <div>
                      <Input name="email" type="email" placeholder="Email" required />
                    </div>
                    <div>
                      <Input name="subject" placeholder="Тема обращения" required />
                    </div>
                    <div>
                      <Textarea name="message" placeholder="Текст обращения" rows={5} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      <Icon name="Send" className="mr-2" size={18} />
                      {isSubmitting ? 'Отправка...' : 'Отправить обращение'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">О нас</h4>
              <p className="text-sm opacity-90">
                ГКУ РД "Управление социальной защиты населения в МО "Город Избербаш"
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <p className="text-sm opacity-90">
                Телефон: +7 (87245) 2-00-00<br />
                Email: uszn_izberbash@mail.ru
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Режим работы</h4>
              <p className="text-sm opacity-90">
                Пн-Пт: 9:00 - 18:00<br />
                Сб-Вс: выходной
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-75">
            © 2025 ГКУ РД "УСЗН в МО "Город Избербаш". Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
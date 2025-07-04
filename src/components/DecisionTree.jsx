import React, { useState, useEffect } from 'react';

const treeStages = [
  {
    id: 'website',
    title: 'Разработка',
    description: 'Чтобы клиент нашёл ваш продукт или услугу, нужен инструмент цифрового присутствия. Выберите подходящий формат.',
    options: [
      { id: 'corporate_site', label: 'Корпоративный сайт', color: 'blue' },
      { id: 'landing_page', label: 'Лендинг-пейдж', color: 'blue', recommended: true },
      { id: 'catalog', label: 'Каталог товаров', color: 'blue', recommended: true },
      { id: 'web_service', label: 'Веб-сервис', color: 'blue' }
    ]
  },
  {
    id: 'marketing',
    title: 'Маркетинг',
    description: 'Чтобы сайт, лендинг или каталог действительно приносил клиентов, его нужно продвигать. Выберите каналы маркетинга.',
    options: [
      { id: 'seo', label: 'SEO', color: 'red' },
      { id: 'google_ads', label: 'Google Ads', color: 'red', recommended: true },
      { id: 'meta_ads', label: 'Meta Ads', color: 'red', recommended: true },
      { id: 'social_media', label: 'Соцсети', color: 'red' }
    ],
    allowMultiple: true
  },
  {
    id: 'crm',
    title: 'CRM',
    description: 'Когда поток клиентов запущен, важно автоматизировать их обработку. Выберите, что нужно от CRM.',
    options: [
      { id: 'automation', label: 'Автоматизация', color: 'yellow' },
      { id: 'integration', label: 'Интеграция', color: 'yellow', recommended: true },
      { id: 'setup', label: 'Настройка', color: 'yellow', recommended: true },
      { id: 'training', label: 'Обучение', color: 'yellow' }
    ],
    allowMultiple: true
  }
];

// Detailed solutions for each option
const solutionDetails = {
  // Website solutions
  corporate_site: {
    title: 'Корпоративный сайт',
    description: 'Профессиональный многостраничный сайт для представления вашей компании',
    technologies: ['React/Next.js', 'WordPress', 'Tilda'],
    features: ['Адаптивный дизайн', 'SEO-оптимизация', 'Система управления контентом', 'Интеграция с аналитикой'],
    deliverables: ['Дизайн-макеты', 'Верстка и программирование', 'Настройка хостинга', 'Обучение управлению']
  },
  landing_page: {
    title: 'Лендинг-пейдж',
    description: 'Одностраничный сайт для конверсии посетителей в клиентов',
    technologies: ['Tilda', 'Webflow', 'Custom HTML/CSS'],
    features: ['Конверсионный дизайн', 'A/B тестирование', 'Интеграция с CRM', 'Формы заявок'],
    deliverables: ['UX/UI дизайн', 'Копирайтинг', 'Верстка', 'Настройка аналитики']
  },
  catalog: {
    title: 'Каталог товаров',
    description: 'Интернет-магазин или каталог с системой управления товарами',
    technologies: ['WooCommerce', 'Shopify', 'Custom E-commerce'],
    features: ['Система фильтрации', 'Корзина и оплата', 'Управление складом', 'Интеграция с 1С'],
    deliverables: ['Настройка каталога', 'Система заказов', 'Платежные системы', 'Обучение администрированию']
  },
  web_service: {
    title: 'Веб-сервис',
    description: 'Специализированное веб-приложение для решения бизнес-задач',
    technologies: ['React', 'Node.js', 'Python/Django', 'Cloud Solutions'],
    features: ['Пользовательские роли', 'API интеграции', 'База данных', 'Безопасность'],
    deliverables: ['Техническое задание', 'Разработка MVP', 'Тестирование', 'Деплой и поддержка']
  },
  
  // Marketing solutions
  seo: {
    title: 'SEO-оптимизация',
    description: 'Техническая и контентная оптимизация для поисковых систем',
    technologies: ['Google Search Console', 'Яндекс.Вебмастер', 'Screaming Frog', 'GTM'],
    features: ['Техническая оптимизация', 'Семантическое ядро', 'Контент-стратегия', 'Линкбилдинг'],
    deliverables: ['SEO-аудит', 'Семантическое ядро', 'Техническая оптимизация', 'Контент-план']
  },
  google_ads: {
    title: 'Google Ads',
    description: 'Настройка и ведение рекламных кампаний в Google',
    technologies: ['Google Ads', 'Google Analytics', 'Google Tag Manager', 'Keyword Planner'],
    features: ['Поисковая реклама', 'Медийная реклама', 'Ремаркетинг', 'Оптимизация ставок'],
    deliverables: ['Стратегия кампаний', 'Настройка аккаунта', 'Создание объявлений', 'Еженедельные отчеты']
  },
  meta_ads: {
    title: 'Meta Ads (Facebook/Instagram)',
    description: 'Таргетированная реклама в социальных сетях Meta',
    technologies: ['Meta Business Manager', 'Facebook Pixel', 'Instagram API', 'Creative Hub'],
    features: ['Таргетинг по интересам', 'Lookalike аудитории', 'Ретаргетинг', 'Креативы'],
    deliverables: ['Настройка пикселя', 'Создание аудиторий', 'Дизайн креативов', 'Отчеты по конверсиям']
  },
  social_media: {
    title: 'Соцсети',
    description: 'Комплексное продвижение в социальных медиа',
    technologies: ['Buffer', 'Hootsuite', 'Canva', 'Instagram Creator Studio'],
    features: ['Контент-стратегия', 'Дизайн постов', 'Сообщество', 'Influencer маркетинг'],
    deliverables: ['SMM-стратегия', 'Контент-план', 'Дизайн-макеты', 'Управление сообществом']
  },
  
  // CRM solutions
  automation: {
    title: 'Автоматизация',
    description: 'Настройка автоматических процессов обработки клиентов',
    technologies: ['Zapier', 'Make.com', 'Bitrix24', 'amoCRM'],
    features: ['Email-воронки', 'Чат-боты', 'Автоответчики', 'Скоринг лидов'],
    deliverables: ['Карта процессов', 'Настройка автоматизации', 'Email-последовательности', 'Тестирование']
  },
  integration: {
    title: 'Интеграция',
    description: 'Подключение CRM к внешним сервисам и системам',
    technologies: ['REST API', 'Webhooks', 'Zapier', '1С:Коннектор'],
    features: ['Интеграция с сайтом', 'Подключение к 1С', 'Email-маркетинг', 'Аналитика'],
    deliverables: ['API-интеграции', 'Синхронизация данных', 'Настройка уведомлений', 'Документация']
  },
  setup: {
    title: 'Настройка',
    description: 'Полная настройка CRM-системы под ваши бизнес-процессы',
    technologies: ['Битрикс24', 'amoCRM', 'Salesforce', 'HubSpot'],
    features: ['Воронка продаж', 'Поля и этапы', 'Права доступа', 'Отчетность'],
    deliverables: ['Настройка воронок', 'Создание полей', 'Настройка ролей', 'Обучение команды']
  },
  training: {
    title: 'Обучение',
    description: 'Обучение команды работе с CRM и процессами продаж',
    technologies: ['Zoom', 'Loom', 'Confluence', 'Google Workspace'],
    features: ['Индивидуальные занятия', 'Групповые тренинги', 'Видео-курсы', 'Практические задания'],
    deliverables: ['Программа обучения', 'Видео-инструкции', 'Практические занятия', 'Сертификация']
  }
};

const TypingText = ({ text, onComplete, delay = 15 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, onComplete]);

  return <p className="typing-text text-left text-base leading-relaxed text-gray-300">{displayText}</p>;
};

const TreeBlock = ({ option, isSelected = false, isClickable = false, onClick, isMultiple = false }) => {
  const colorClasses = {
    blue: isSelected 
      ? 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400 shadow-lg' 
      : 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400',
    red: isSelected 
      ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400 shadow-lg' 
      : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-400',
    yellow: isSelected 
      ? 'bg-gradient-to-br from-yellow-500 to-yellow-700 border-yellow-400 shadow-lg' 
      : 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-400'
  };

  return (
    <div 
      className={`
        tree-block px-4 py-3 rounded-lg border-2 transition-all duration-300 mr-3 mb-3 inline-block backdrop-blur-sm
        ${isClickable ? 'cursor-pointer hover:scale-105 hover:shadow-lg transform' : ''}
        ${colorClasses[option.color] || 'bg-gray-600/20 border-gray-500/30'}
        ${isSelected ? 'ring-2 ring-white/20' : ''}
      `}
      onClick={isClickable ? onClick : undefined}
      style={{
        animation: 'fadeInRight 0.5s ease-out'
      }}
    >
      <span className="text-white text-sm font-semibold">
        {option.label}
      </span>
      {isMultiple && isSelected && (
        <span className="text-xs ml-2 text-green-300">✓</span>
      )}
    </div>
  );
};

const StageRow = ({ 
  stage, 
  stageIndex, 
  isActive, 
  isCompleted, 
  selections, 
  onOptionSelect, 
  isOptionSelected, 
  showDescription, 
  showOptions, 
  onDescriptionComplete, 
  canContinue, 
  onContinue 
}) => {
  const titleColors = {
    0: 'from-blue-400 to-blue-600',  // Разработка
    1: 'from-red-400 to-red-600',    // Маркетинг  
    2: 'from-yellow-400 to-yellow-600' // CRM
  };

  const getStageColorClasses = (stageIndex) => {
    const stageColors = {
      0: { // Разработка - синий
        gradient: 'from-blue-500 to-blue-700',
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/10',
        accent: 'text-blue-400'
      },
      1: { // Маркетинг - красный
        gradient: 'from-red-500 to-red-700',
        border: 'border-red-500/30',
        bg: 'bg-red-500/10',
        accent: 'text-red-400'
      },
      2: { // CRM - жёлтый
        gradient: 'from-yellow-500 to-yellow-700',
        border: 'border-yellow-500/30',
        bg: 'bg-yellow-500/10',
        accent: 'text-yellow-400'
      }
    };
    return stageColors[stageIndex];
  };

  const stageIcons = {
    0: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    ),
    1: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M7 4h10"></path>
      </svg>
    ),
    2: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    )
  };

  return (
    <div className="stage-row mb-8">
      {/* Stage Card */}
      <div className={`
        bg-white/5 backdrop-blur-sm border rounded-xl p-8 transition-all duration-500
        ${isCompleted 
          ? `border-white/20 bg-white/8` 
          : isActive 
          ? `${getStageColorClasses(stageIndex).border} bg-white/8` 
          : 'border-white/10'}
      `}>
        {/* Stage Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`
              w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500
              ${isCompleted 
                ? `bg-gradient-to-br ${titleColors[stageIndex]} shadow-lg` 
                : isActive 
                ? `bg-gradient-to-br ${titleColors[stageIndex]} shadow-lg` 
                : 'bg-gray-800/50 border border-gray-600/30'}
            `}>
              <div className={`${isCompleted || isActive ? 'text-white' : 'text-gray-500'}`}>
                {stageIcons[stageIndex]}
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-bold transition-all duration-500 ${
                isCompleted || isActive ? 'text-white' : 'text-gray-500'
              }`}>
                {stage.title}
              </h3>
              <div className={`text-sm font-medium ${
                isCompleted ? 'text-green-400' : isActive ? getStageColorClasses(stageIndex).accent : 'text-gray-500'
              }`}>
                {isCompleted ? 'Завершено' : isActive ? 'Активно' : 'Ожидание'}
              </div>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCompleted 
              ? 'bg-green-500 text-white' 
              : isActive 
              ? `bg-gradient-to-br ${titleColors[stageIndex]} text-white` 
              : 'bg-gray-600 text-gray-300'
          }`}>
            {stageIndex + 1}
          </div>
        </div>

        {/* Stage Content */}
        {isActive && (
          <div className="space-y-6">
            {/* Description */}
            {showDescription && (
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <TypingText 
                  text={stage.description}
                  onComplete={onDescriptionComplete}
                />
              </div>
            )}

            {/* Options */}
            {showOptions && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stage.options.map((option) => (
                    <div
                      key={option.id}
                      className={`
                        relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer backdrop-blur-sm
                        hover:scale-105 hover:shadow-lg transform group
                        ${isOptionSelected(option) 
                          ? `bg-gradient-to-br from-${option.color}-500/20 to-${option.color}-700/20 border-${option.color}-400 shadow-lg ring-2 ring-white/20` 
                          : option.recommended
                          ? `bg-${option.color}-500/15 border-${option.color}-400/50 hover:bg-${option.color}-500/25 hover:border-${option.color}-400 animate-pulse-subtle`
                          : `bg-${option.color}-500/10 border-${option.color}-500/30 hover:bg-${option.color}-500/20 hover:border-${option.color}-400`
                        }
                      `}
                      onClick={() => onOptionSelect(option)}
                      style={{
                        animation: 'fadeInUp 0.5s ease-out'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold group-hover:text-white/90 ${
                          option.recommended ? 'text-white' : 'text-white'
                        }`}>
                          {option.label}
                          {option.recommended && (
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full bg-${option.color}-500/30 text-${option.color}-300 font-medium`}>
                              Рекомендуем
                            </span>
                          )}
                        </span>
                        {stage.allowMultiple && isOptionSelected(option) && (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue button for multiple selection stages */}
                {stage.allowMultiple && (
                  <div className="flex justify-center pt-4">
                    <button 
                      onClick={onContinue}
                      disabled={!canContinue()}
                      className={`
                        px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 
                        transform hover:scale-105 relative overflow-hidden backdrop-blur-sm
                        ${canContinue() 
                          ? `bg-gradient-to-r ${titleColors[stageIndex]} hover:shadow-lg border border-white/20` 
                          : 'bg-gray-600/50 border-gray-500/30 cursor-not-allowed opacity-50'
                        }
                      `}
                    >
                      <span className="relative z-10 flex items-center">
                        {stageIndex === treeStages.length - 1 ? 'Завершить' : 'Продолжить'}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                      {canContinue() && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Completed Stage - Show Selected Options */}
        {isCompleted && (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {stage.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selections.map((selection, index) => (
                  <div 
                    key={`${selection.id}-${index}`}
                    className={`
                      px-3 py-2 rounded-lg border-2 backdrop-blur-sm
                      bg-gradient-to-br from-${selection.color}-500 to-${selection.color}-700 
                      border-${selection.color}-400 shadow-lg ring-1 ring-white/20
                    `}
                  >
                    <span className="text-white text-sm font-semibold flex items-center">
                      {selection.label}
                      <svg className="w-4 h-4 ml-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DecisionTree = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selections, setSelections] = useState({
    website: null,
    marketing: [],
    crm: []
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showSolutionDetails, setShowSolutionDetails] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Calculator state
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [timeline, setTimeline] = useState('standard');
  const [complexity, setComplexity] = useState(0.25); // 0-1 scale for slider
  const [isDragging, setIsDragging] = useState(false);
  
  // Service Data (from HTML calculator)
  const serviceData = {
    development: {
      name: 'Web Development',
      basePrice: 8000,
      description: 'Custom website or web application with modern design and functionality',
      features: [
        'Responsive design for all devices',
        'Content management system',
        'SEO optimization',
        'Performance optimization',
        'Basic analytics setup'
      ]
    },
    marketing: {
      name: 'Digital Marketing',
      basePrice: 5000,
      description: 'Comprehensive marketing strategy and campaign execution',
      features: [
        'Marketing strategy development',
        'Google Ads & Facebook campaigns',
        'Content creation and management',
        'Analytics and reporting',
        'Monthly optimization'
      ]
    },
    crm: {
      name: 'CRM & Automation',
      basePrice: 4000,
      description: 'Customer relationship management and process automation',
      features: [
        'CRM system setup and customization',
        'Workflow automation',
        'Email marketing integration',
        'Lead scoring and nurturing',
        'Training and documentation'
      ]
    },
    consulting: {
      name: 'Strategy Consulting',
      basePrice: 3000,
      description: 'Strategic guidance for digital transformation',
      features: [
        'Digital strategy assessment',
        'Technology roadmap',
        'Process optimization plan',
        'Team training recommendations',
        'Implementation support'
      ]
    }
  };
  
  const timelineMultipliers = {
    rush: 1.5,
    standard: 1.0,
    flexible: 0.9,
    planning: 0.8
  };
  
  const complexityLabels = ['Simple', 'Standard', 'Advanced', 'Enterprise'];
  const complexityTimes = ['2-4 weeks', '4-8 weeks', '8-12 weeks', '12-20 weeks'];
  const complexityFactors = ['1.0x', '1.5x', '2.0x', '3.0x'];
  
  // Calculate total price and duration
  const calculateTotals = () => {
    let totalPrice = 0;
    let totalWeeks = 0;
    
    // Calculate base prices
    selectedServices.forEach(serviceType => {
      const service = serviceData[serviceType];
      totalPrice += service.basePrice;
      totalWeeks += 2; // Base weeks per service
    });
    
    // Apply complexity multiplier
    const complexityMultiplier = 1 + (complexity * 2); // 1x to 3x
    totalPrice *= complexityMultiplier;
    totalWeeks *= complexityMultiplier;
    
    // Apply timeline multiplier
    totalPrice *= timelineMultipliers[timeline];
    
    return {
      totalPrice: selectedServices.size > 0 ? Math.round(totalPrice) : 0,
      totalDuration: selectedServices.size > 0 ? Math.round(totalWeeks) : 0
    };
  };
  
  const { totalPrice, totalDuration } = calculateTotals();
  
  // Service toggle function
  const toggleService = (serviceType) => {
    const newServices = new Set(selectedServices);
    if (newServices.has(serviceType)) {
      newServices.delete(serviceType);
    } else {
      newServices.add(serviceType);
    }
    setSelectedServices(newServices);
  };
  
  // Timeline selection
  const selectTimeline = (timelineType) => {
    setTimeline(timelineType);
  };
  
  // Slider functionality
  const startDrag = (event) => {
    setIsDragging(true);
    
    const handleMouseMove = (e) => {
      const slider = e.target.closest('.calculator-dropdown').querySelector('.complexity-slider');
      if (!slider) return;
      
      const rect = slider.getBoundingClientRect();
      let newPosition = (e.clientX - rect.left) / rect.width;
      newPosition = Math.max(0, Math.min(1, newPosition));
      setComplexity(newPosition);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    event.preventDefault();
  };

  const handleStart = () => {
    setShowDescription(true);
  };

  const handleDescriptionComplete = () => {
    setShowOptions(true);
  };

  const handleOptionSelect = (option) => {
    const stage = treeStages[currentStage];
    
    if (stage.allowMultiple) {
      setSelections(prev => {
        const currentSelections = prev[stage.id];
        const isAlreadySelected = currentSelections.some(item => item.id === option.id);
        
        if (isAlreadySelected) {
          return {
            ...prev,
            [stage.id]: currentSelections.filter(item => item.id !== option.id)
          };
        } else {
          return {
            ...prev,
            [stage.id]: [...currentSelections, option]
          };
        }
      });
    } else {
      setSelections(prev => ({
        ...prev,
        [stage.id]: option
      }));
      
      setTimeout(() => {
        if (currentStage < treeStages.length - 1) {
          setCurrentStage(prev => prev + 1);
          setShowDescription(true);
          setShowOptions(false);
        }
      }, 1000);
    }
  };

  const handleContinue = () => {
    const stage = treeStages[currentStage];
    const hasSelections = stage.allowMultiple ? 
      selections[stage.id].length > 0 : 
      selections[stage.id] !== null;

    if (hasSelections) {
      if (currentStage < treeStages.length - 1) {
        setCurrentStage(prev => prev + 1);
        setShowDescription(true);
        setShowOptions(false);
      } else {
        setIsComplete(true);
      }
    }
  };

  const handleSubmit = () => {
    setShowSolutionDetails(true);
  };

  const handleSendRequest = () => {
    setShowThankYou(true);
  };

  const handleBack = () => {
    if (showThankYou) {
      setShowThankYou(false);
      setShowSolutionDetails(true);
    } else if (showSolutionDetails) {
      setShowSolutionDetails(false);
      setIsComplete(true);
    } else if (isComplete) {
      setIsComplete(false);
      // Возвращаемся к последнему этапу
      const lastStage = treeStages.length - 1;
      setCurrentStage(lastStage);
      setShowDescription(false);
      setShowOptions(true);
    } else if (showOptions && !showDescription) {
      // Если показываются опции, возвращаемся к описанию
      setShowOptions(false);
      setShowDescription(true);
    } else if (showDescription && currentStage > 0) {
      // Если показывается описание, переходим к предыдущему этапу
      setCurrentStage(prev => prev - 1);
      setShowDescription(false);
      setShowOptions(true);
      
      // Сбрасываем выбор текущего этапа
      const currentStageData = treeStages[currentStage];
      if (currentStageData) {
        setSelections(prev => ({
          ...prev,
          [currentStageData.id]: currentStageData.allowMultiple ? [] : null
        }));
      }
    } else if (showDescription && currentStage === 0) {
      // Если на первом этапе с описанием, возвращаемся к стартовому экрану
      setShowDescription(false);
      setShowOptions(false);
    }
  };

  const handleRestart = () => {
    setCurrentStage(0);
    setShowDescription(false);
    setShowOptions(false);
    setSelections({
      website: null,
      marketing: [],
      crm: []
    });
    setIsComplete(false);
    setShowThankYou(false);
    setShowSolutionDetails(false);
  };

  const isOptionSelected = (option) => {
    const stage = treeStages[currentStage];
    if (stage.allowMultiple) {
      return selections[stage.id].some(item => item.id === option.id);
    }
    return selections[stage.id]?.id === option.id;
  };

  const canContinue = () => {
    const stage = treeStages[currentStage];
    return stage.allowMultiple ? 
      selections[stage.id].length > 0 : 
      selections[stage.id] !== null;
  };

  const getStageSelections = (stageId) => {
    const stageData = selections[stageId];
    if (Array.isArray(stageData)) {
      return stageData;
    }
    return stageData ? [stageData] : [];
  };

  const isStageCompleted = (stageIndex) => {
    const stage = treeStages[stageIndex];
    const stageSelections = selections[stage.id];
    
    if (stage.allowMultiple) {
      return Array.isArray(stageSelections) && stageSelections.length > 0;
    }
    return stageSelections !== null;
  };

  const generateSolutionPackage = () => {
    const solutionCategories = [];
    
    // Add website solutions (Разработка)
    if (selections.website) {
      solutionCategories.push({
        category: 'Разработка',
        color: 'blue',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        ),
        solutions: [solutionDetails[selections.website.id]]
      });
    }
    
    // Add marketing solutions (Маркетинг)
    if (selections.marketing.length > 0) {
      const marketingSolutions = selections.marketing.map(option => solutionDetails[option.id]);
      solutionCategories.push({
        category: 'Маркетинг',
        color: 'red',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M7 4h10"></path>
          </svg>
        ),
        solutions: marketingSolutions
      });
    }
    
    // Add CRM solutions (CRM)
    if (selections.crm.length > 0) {
      const crmSolutions = selections.crm.map(option => solutionDetails[option.id]);
      solutionCategories.push({
        category: 'CRM',
        color: 'yellow',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        ),
        solutions: crmSolutions
      });
    }
    
    return solutionCategories;
  };

  return (
    <div className="min-h-200px text-white relative overflow-hidden" style={{
      
    }}>
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}
      ></div>

      {/* Geometric Shapes */}
      <div className="absolute w-12 h-12 top-60 right-8 border border-red-500/20 rounded-full" style={{animation: 'pulse-glow 3s ease-in-out infinite'}}></div>

      <style jsx>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { opacity: 0.9; box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .typing-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
        }
        
        /* AI Assistant Styles */
        .glow-container {
          position: relative;
          display: inline-block;
        }
        
        .robot-icon {
          background: linear-gradient(135deg, #3b82f6 0%, #eab308 50%, #ef4444 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        }
        
        .robot-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, #3b82f6, #eab308, #ef4444, #3b82f6);
          animation: rotate-glow 3s linear infinite;
          z-index: -1;
        }
        
        .robot-icon::after {
          content: '';
          position: absolute;
          inset: 3px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
          border-radius: 50%;
          z-index: -1;
        }
        
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid;
          border-radius: 50%;
          animation: pulse-expand 3s ease-in-out infinite;
        }
        
        .pulse-ring:nth-child(1) {
          animation-delay: 0s;
          animation-duration: 3s;
        }
        
        .pulse-ring:nth-child(2) {
          animation-delay: 1s;
          animation-duration: 3s;
        }
        
        .pulse-ring:nth-child(3) {
          animation-delay: 2s;
          animation-duration: 3s;
        }
        
    
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-expand {
          0% {
            width: 96px;
            height: 96px;
            opacity: 0.8;
            border-color: rgba(59, 130, 246, 0.8);
            border-radius: 50%;
          }
          33% {
            border-color: rgba(234, 179, 8, 0.6);
            opacity: 0.6;
          }
          66% {
            border-color: rgba(239, 68, 68, 0.4);
            opacity: 0.3;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            border-color: rgba(239, 68, 68, 0);
            border-radius: 50%;
          }
        }
        
        .floating-particles {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--particle-color);
          border-radius: 50%;
          opacity: 0.6;
          animation: float-around 8s infinite ease-in-out;
        }
        
        .particle-1 { --particle-color: #3b82f6; top: 20%; left: 15%; animation-delay: 0s; }
        .particle-2 { --particle-color: #eab308; top: 30%; right: 20%; animation-delay: 1s; }
        .particle-3 { --particle-color: #ef4444; bottom: 25%; left: 20%; animation-delay: 2s; }
        .particle-4 { --particle-color: #3b82f6; bottom: 35%; right: 15%; animation-delay: 3s; }
        .particle-5 { --particle-color: #eab308; top: 15%; right: 30%; animation-delay: 4s; }
        .particle-6 { --particle-color: #ef4444; bottom: 20%; right: 35%; animation-delay: 5s; }
        
        @keyframes float-around {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(15px) scale(1.3);
            opacity: 0.9;
          }
          50% { 
            transform: translateY(-10px) translateX(-10px) scale(0.8);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-25px) translateX(20px) scale(1.1);
            opacity: 0.7;
          }
        }
        
        .try-button {
          background: transparent;
          border: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .try-button:hover {
          transform: scale(1.05);
        }
        
        .calculator-button {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .calculator-button:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(234, 179, 8, 0.3);
          transform: translateY(-2px);
        }
        
        .calculator-dropdown {
          animation: slideDown 0.5s ease-out;
          max-height: 3000px;
          opacity: 1;
        }
        
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            max-height: 3000px;
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .service-cardy {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .service-cardy.selected {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .service-cardy.development.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }
        
        .service-cardy.marketing.selected {
          border-color: #ef4444;
          background: #fef2f2;
        }
        
        .service-cardy.crm.selected {
          border-color: #eab308;
          background: #fefce8;
        }
        
        .service-cardy.consulting.selected {
          border-color: #10b981;
          background: #f0fdf4;
        }
        
        .service-cardy:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .service-icon {
          transition: all 0.3s ease;
        }
        
        .service-card.selected .service-icon {
          transform: scale(1.1);
        }
        
        .complexity-slider {
          background: #e2e8f0;
          border-radius: 12px;
          height: 8px;
          position: relative;
          overflow: hidden;
        }
        
        .complexity-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #eab308, #ef4444);
          border-radius: 12px;
          transition: width 0.3s ease;
        }
        
        .complexity-thumb {
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: 3px solid #3b82f6;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          cursor: grab;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }
        
        .complexity-thumb:hover {
          transform: translateX(-50%) translateY(-50%) scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .complexity-thumb:active {
          cursor: grabbing;
          transform: translateX(-50%) translateY(-50%) scale(1.05);
        }
        
        .timeline-option {
          background: #f1f5f9;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .timeline-option.selected {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
          transform: scale(1.02);
        }
        
        .timeline-option:hover:not(.selected) {
          border-color: #3b82f6;
          background: #eff6ff;
        }
      `}</style>

      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Exit and Back Navigation */}
          {(showDescription || currentStage > 0) && (
            <div className="fixed top-6 left-6 z-50 flex space-x-4">
              {/* Exit Button */}
              <button 
                onClick={handleRestart}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium">Выйти</span>
              </button>
              
              {/* Back Button */}
              {(currentStage > 0 || showOptions) && (
                <button 
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30 rounded-lg text-gray-300 hover:text-gray-200 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Назад</span>
                </button>
              )}
            </div>
          )}

          {/* Start Screen - AI Assistant Cover */}
          {currentStage === 0 && !showDescription && (
            <div className="relative min-h-[400px]">
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="floating-particles particle-1"></div>
                <div className="floating-particles particle-2"></div>
                <div className="floating-particles particle-3"></div>
                <div className="floating-particles particle-4"></div>
                <div className="floating-particles particle-5"></div>
                <div className="floating-particles particle-6"></div>
              </div>
              
              {/* Top Left Heading */}
<h4 className="absolute top-0 left-0 text-lg font-medium text-gray-300 mb-4">
  Wondering where to start?<br />
  <span
    className="text-transparent bg-clip-text font-semibold"
    style={{
      background: 'linear-gradient(135deg, #3b82f6 0%, #eab308 50%, #ef4444 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}
  >
    Ask our AI assistant
  </span>
</h4>

              {/* Center Content - Robot and Try Me */}
              <div className="text-center pt-16 pb-8">
                {/* Robot with Pulsing Rings */}
                <div className="glow-container relative inline-block">
                  {/* Pulsing Rings */}
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring"></div>
                  
                  {/* Robot Icon */}
                  <div className="robot-icon w-24 h-24 mx-auto relative z-10 cursor-pointer" onClick={handleStart}>
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L18 4H6L3 7V9H4V15H3V17H5V20C5 21.1 5.9 22 7 22H9C10.1 22 11 21.1 11 20V17H13V20C13 21.1 13.9 22 15 22H17C18.1 22 19 21.1 19 20V17H21V15H20V9H21ZM18 15H6V9H18V15ZM8 11C8 10.4 8.4 10 9 10S10 10.4 10 11S9.6 12 9 12S8 11.6 8 11ZM14 11C14 10.4 14.4 10 15 10S16 10.4 16 11S15.6 12 15 12S14 11.6 14 11Z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Try Me Button */}
                <div className="mt-8">
                  <button 
                    className="try-button px-8 py-4 rounded-xl font-semibold text-white text-lg relative group"
                    onClick={handleStart}
                  >
                    <span className="relative z-10">Try Me</span>
                  </button>
                </div>
              </div>
              
              {/* Bottom Right Calculator Option */}
              <div className="absolute bottom-0 right-0 text-right">
                <p className="text-sm text-gray-400 mb-3">
                  Or, you can use our manual<br />calculator as well
                </p>
                <button 
                  className="calculator-button px-4 py-3 rounded-lg text-sm text-gray-300 flex items-center space-x-2" 
                  onClick={() => setShowCalculator(!showCalculator)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM6.5 7.5H9.5V9H6.5V7.5ZM6.5 10.5H9.5V12H6.5V10.5ZM6.5 13.5H9.5V15H6.5V13.5ZM10.5 7.5H13.5V9H10.5V7.5ZM10.5 10.5H13.5V12H10.5V10.5ZM10.5 13.5H13.5V15H10.5V13.5ZM14.5 7.5H17.5V9H14.5V7.5ZM14.5 10.5H17.5V12H14.5V10.5ZM14.5 13.5H17.5V17.5H14.5V13.5ZM6.5 16H13.5V17.5H6.5V16Z"/>
                  </svg>
                  <span>Manual calculator</span>
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${showCalculator ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Dropdown Calculator Section - Full HTML Calculator Port */}
          {showCalculator && currentStage === 0 && !showDescription && (
            <div className="calculator-dropdown mt-8 overflow-hidden">
              <div className="bg-white backdrop-blur-lg rounded-2xl p-12 transition-all duration-500 ease-out transform" style={{
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}>
                <div className="max-w-6xl mx-auto relative">
                  
                  {/* Step 1: Service Selection */}
                  <div className="mb-12">
                    <div className="flex items-center mb-8">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping opacity-25"></div>
                        1
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Choose Your Services</h3>
                        <p className="text-gray-600">Select the digital solutions your business needs</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Development Card */}
                      <div 
                        className={`service-cardy development rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                          selectedServices.has('development') 
                            ? 'bg-blue-50 border-blue-500 transform -translate-y-2 shadow-lg' 
                            : 'bg-gray-50 border-gray-200 hover:border-blue-500 hover:-translate-y-1'
                        } border-2`}
                        onClick={() => toggleService('development')}
                      >
                        <div className={`w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          selectedServices.has('development') ? 'scale-110' : ''
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Web Development</h4>
                        <p className="text-sm text-gray-600 mb-3">Custom websites & platforms</p>
                        <div className="text-xs text-blue-600 font-medium">€3,000 - €25,000</div>
                      </div>
                      
                      {/* Marketing Card */}
                      <div 
                        className={`service-cardy marketing rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                          selectedServices.has('marketing') 
                            ? 'bg-red-50 border-red-500 transform -translate-y-2 shadow-lg' 
                            : 'bg-gray-50 border-gray-200 hover:border-red-500 hover:-translate-y-1'
                        } border-2`}
                        onClick={() => toggleService('marketing')}
                      >
                        <div className={`w-12 h-12 mx-auto mb-4 bg-red-500 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          selectedServices.has('marketing') ? 'scale-110' : ''
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Digital Marketing</h4>
                        <p className="text-sm text-gray-600 mb-3">Ads, SEO & campaigns</p>
                        <div className="text-xs text-red-600 font-medium">€2,000 - €15,000</div>
                      </div>
                      
                      {/* CRM Card */}
                      <div 
                        className={`service-cardy crm rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                          selectedServices.has('crm') 
                            ? 'bg-yellow-50 border-yellow-500 transform -translate-y-2 shadow-lg' 
                            : 'bg-gray-50 border-gray-200 hover:border-yellow-500 hover:-translate-y-1'
                        } border-2`}
                        onClick={() => toggleService('crm')}
                      >
                        <div className={`w-12 h-12 mx-auto mb-4 bg-yellow-500 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          selectedServices.has('crm') ? 'scale-110' : ''
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">CRM & Automation</h4>
                        <p className="text-sm text-gray-600 mb-3">Process optimization</p>
                        <div className="text-xs text-yellow-600 font-medium">€1,500 - €10,000</div>
                      </div>
                      
                      {/* Consulting Card */}
                      <div 
                        className={`service-cardy consulting rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                          selectedServices.has('consulting') 
                            ? 'bg-green-50 border-green-500 transform -translate-y-2 shadow-lg' 
                            : 'bg-gray-50 border-gray-200 hover:border-green-500 hover:-translate-y-1'
                        } border-2`}
                        onClick={() => toggleService('consulting')}
                      >
                        <div className={`w-12 h-12 mx-auto mb-4 bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          selectedServices.has('consulting') ? 'scale-110' : ''
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Strategy Consulting</h4>
                        <p className="text-sm text-gray-600 mb-3">Digital transformation</p>
                        <div className="text-xs text-green-600 font-medium">€1,000 - €8,000</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Complexity Slider */}
                  <div className="mb-12">
                    <div className="flex items-center mb-8">
                      <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Project Complexity</h3>
                        <p className="text-gray-600">How complex should your solution be?</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Simple</span>
                          <span>Standard</span>
                          <span>Advanced</span>
                          <span>Enterprise</span>
                        </div>
                        <div className="complexity-slider relative bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full transition-all duration-300" 
                            style={{width: `${complexity * 100}%`}}
                          ></div>
                          <div 
                            className="w-6 h-6 bg-white border-3 border-blue-500 rounded-full absolute top-1/2 cursor-grab shadow-lg transition-all duration-200 hover:scale-110"
                            style={{left: `${complexity * 100}%`, transform: 'translateX(-50%) translateY(-50%)'}}
                            onMouseDown={startDrag}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="text-sm font-medium text-gray-900 mb-1">Current Level</div>
                          <div className="text-lg font-bold text-blue-600">{complexityLabels[Math.floor(complexity * 3.99)]}</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="text-sm font-medium text-gray-900 mb-1">Estimated Time</div>
                          <div className="text-lg font-bold text-gray-900">{complexityTimes[Math.floor(complexity * 3.99)]}</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="text-sm font-medium text-gray-900 mb-1">Complexity Factor</div>
                          <div className="text-lg font-bold text-gray-900">{complexityFactors[Math.floor(complexity * 3.99)]}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Timeline */}
                  <div className="mb-12">
                    <div className="flex items-center mb-8">
                      <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold mr-4">
                        3
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Project Timeline</h3>
                        <p className="text-gray-600">When do you need your project completed?</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      {[
                        { id: 'rush', label: 'Rush', time: '1-2 weeks', cost: '+50% cost', color: 'text-red-600' },
                        { id: 'standard', label: 'Standard', time: '3-6 weeks', cost: 'Normal pricing', color: 'text-gray-600' },
                        { id: 'flexible', label: 'Flexible', time: '6-10 weeks', cost: '-10% cost', color: 'text-green-600' },
                        { id: 'planning', label: 'Planning Phase', time: 'Future project', cost: '-20% cost', color: 'text-green-600' }
                      ].map((option) => (
                        <div 
                          key={option.id}
                          className={`rounded-lg p-4 text-center cursor-pointer transition-all duration-300 border-2 ${
                            timeline === option.id 
                              ? 'bg-blue-500 text-white border-blue-500 scale-102' 
                              : 'bg-gray-100 hover:bg-blue-50 border-gray-200 hover:border-blue-500'
                          }`}
                          onClick={() => selectTimeline(option.id)}
                        >
                          <div className={`font-semibold mb-1 ${timeline === option.id ? 'text-white' : 'text-gray-900'}`}>{option.label}</div>
                          <div className={`text-sm mb-2 ${timeline === option.id ? 'text-blue-100' : 'text-gray-600'}`}>{option.time}</div>
                          <div className={`text-xs font-medium ${timeline === option.id ? 'text-white' : option.color}`}>{option.cost}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Results */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
                    
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Your Custom Estimate</h3>
                        <p className="text-gray-600">Based on your selections</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white rounded-xl p-6 text-center border-2 border-gray-100">
                        <div className="text-sm font-medium text-gray-600 mb-2">Total Investment</div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">€{totalPrice.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Estimated range</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center border-2 border-gray-100">
                        <div className="text-sm font-medium text-gray-600 mb-2">Project Duration</div>
                        <div className="text-3xl font-bold text-blue-600 mb-1">{totalDuration} weeks</div>
                        <div className="text-sm text-gray-500">Including revisions</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center border-2 border-gray-100">
                        <div className="text-sm font-medium text-gray-600 mb-2">Services Selected</div>
                        <div className="text-3xl font-bold text-green-600 mb-1">{selectedServices.size}</div>
                        <div className="text-sm text-gray-500">Digital solutions</div>
                      </div>
                    </div>
                    
                    {/* Selected Services Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Your Digital Package Includes:</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        {selectedServices.size === 0 ? (
                          <div className="text-gray-400 italic">Select services above to see what's included</div>
                        ) : (
                          Array.from(selectedServices).map(serviceType => {
                            const service = serviceData[serviceType];
                            return (
                              <div key={serviceType} className="bg-white rounded-lg p-4 border">
                                <div className="font-semibold text-gray-900 mb-2">{service.name}</div>
                                <div className="text-sm text-gray-600 mb-3">{service.description}</div>
                                <ul className="text-xs text-gray-500 space-y-1">
                                  {service.features.map((feature, idx) => (
                                    <li key={idx}>• {feature}</li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <span className="flex items-center justify-center">
                          Get Detailed Proposal
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                          </svg>
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => setShowCalculator(false)}
                        className="flex-1 py-4 px-6 rounded-lg font-semibold text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        Close Calculator
                      </button>
                    </div>
                    
                    {/* Trust Indicators */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">150+</div>
                        <div className="text-xs text-gray-500">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">48h</div>
                        <div className="text-xs text-gray-500">Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">98%</div>
                        <div className="text-xs text-gray-500">Client Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* MindMap Tree Structure */}
          {(showDescription || currentStage > 0) && (
            <div className="mindmap-container space-y-8">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ваше цифровое древо
              </h2>
              
              {treeStages.map((stage, stageIndex) => {
                const isActive = stageIndex === currentStage;
                const isCompleted = stageIndex < currentStage || (stageIndex === currentStage && isComplete);
                const stageSelections = getStageSelections(stage.id);
                
                if (stageIndex <= currentStage || isStageCompleted(stageIndex)) {
                  return (
                    <StageRow
                      key={stage.id}
                      stage={stage}
                      stageIndex={stageIndex}
                      isActive={isActive && !isComplete}
                      isCompleted={isCompleted}
                      selections={stageSelections}
                      onOptionSelect={handleOptionSelect}
                      isOptionSelected={isOptionSelected}
                      showDescription={showDescription && isActive}
                      showOptions={showOptions && isActive}
                      onDescriptionComplete={handleDescriptionComplete}
                      canContinue={canContinue}
                      onContinue={handleContinue}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}

          {/* Final Screen */}
          {isComplete && !showThankYou && !showSolutionDetails && (
            <div className="text-center space-y-8 mt-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium backdrop-blur-sm mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Древо решений готово
              </div>
              
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Ваша цифровая экосистема сформирована!
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Полная архитектура для вашего бизнеса готова. Посмотрим детальный план реализации?
              </p>
              
              <button 
                onClick={handleSubmit}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-semibold text-white 
                         hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 
                         relative overflow-hidden backdrop-blur-sm border border-white/20 group"
              >
                <span className="relative z-10">Показать детальный план</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </div>
          )}

          {/* Solution Details Screen */}
          {showSolutionDetails && !showThankYou && (
            <div className="space-y-8 mt-8">
              {/* Header */}
              <div className="text-center space-y-6 mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium backdrop-blur-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                  Ваш персональный пакет решений
                </div>
                
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Вот что мы для вас подготовили
                </h2>
                
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  На основе ваших выборов наш ИИ-консультант составил детальный план реализации проекта 
                  с конкретными технологиями и решениями
                </p>
              </div>

              {/* Solutions Categories */}
              <div className="space-y-12 max-w-6xl mx-auto">
                {generateSolutionPackage().map((category, categoryIndex) => {
                  const categoryColors = {
                    blue: {
                      gradient: 'from-blue-500 to-blue-700',
                      border: 'border-blue-500/30',
                      bg: 'bg-blue-500/10',
                      accent: 'text-blue-400'
                    },
                    red: {
                      gradient: 'from-red-500 to-red-700',
                      border: 'border-red-500/30',
                      bg: 'bg-red-500/10',
                      accent: 'text-red-400'
                    },
                    yellow: {
                      gradient: 'from-yellow-500 to-yellow-700',
                      border: 'border-yellow-500/30',
                      bg: 'bg-yellow-500/10',
                      accent: 'text-yellow-400'
                    }
                  };

                  const colors = categoryColors[category.color];

                  return (
                    <div key={categoryIndex} className="space-y-6">
                      {/* Category Header */}
                      <div className={`
                        flex items-center space-x-4 p-6 rounded-xl border-2 backdrop-blur-sm
                        ${colors.bg} ${colors.border}
                      `}>
                        <div className={`
                          w-16 h-16 rounded-xl flex items-center justify-center
                          bg-gradient-to-br ${colors.gradient} shadow-lg
                        `}>
                          <div className="text-white">
                            {category.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-3xl font-bold ${colors.accent} mb-1`}>
                            {category.category}
                          </h3>
                          <p className="text-gray-300">
                            {category.solutions.length === 1 
                              ? '1 решение' 
                              : `${category.solutions.length} решения`}
                          </p>
                        </div>
                        <div className="flex-1"></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-br ${colors.gradient} text-white`}>
                          {categoryIndex + 1}
                        </div>
                      </div>

                      {/* Solutions in Category */}
                      <div className="grid gap-6">
                        {category.solutions.map((solution, solutionIndex) => (
                          <div 
                            key={solutionIndex} 
                            className={`
                              bg-white/5 backdrop-blur-sm border rounded-xl p-8 transition-all duration-300
                              hover:bg-white/8 ${colors.border} hover:border-opacity-50
                            `}
                          >
                            <div className="flex items-start justify-between mb-6">
                              <div>
                                <h4 className="text-2xl font-bold text-white mb-2">{solution.title}</h4>
                                <p className="text-gray-300 text-base leading-relaxed">{solution.description}</p>
                              </div>
                              <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${colors.gradient}`}>
                                <span className="text-white font-bold text-lg">
                                  {category.solutions.length === 1 ? '●' : solutionIndex + 1}
                                </span>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                              {/* Technologies */}
                              <div>
                                <h5 className={`text-sm font-semibold ${colors.accent} mb-3 uppercase tracking-wide`}>
                                  Технологии
                                </h5>
                                <div className="space-y-2">
                                  {solution.technologies.map((tech, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`}></div>
                                      <span className="text-gray-300 text-sm">{tech}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Features */}
                              <div>
                                <h5 className={`text-sm font-semibold ${colors.accent} mb-3 uppercase tracking-wide`}>
                                  Возможности
                                </h5>
                                <div className="space-y-2">
                                  {solution.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`}></div>
                                      <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Deliverables */}
                              <div>
                                <h5 className={`text-sm font-semibold ${colors.accent} mb-3 uppercase tracking-wide`}>
                                  Что получите
                                </h5>
                                <div className="space-y-2">
                                  {solution.deliverables.map((deliverable, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`}></div>
                                      <span className="text-gray-300 text-sm">{deliverable}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="text-center space-y-6 mt-12 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white">Готовы начать реализацию?</h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Наша команда экспертов готова воплотить этот план в жизнь. Отправьте запрос, и мы свяжемся с вами 
                  в течение 24 часов для обсуждения деталей и сроков.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleSendRequest}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white 
                             hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 
                             relative overflow-hidden backdrop-blur-sm border border-white/20 group"
                  >
                    <span className="relative z-10 flex items-center">
                      Отправить запрос
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </button>
                  
                  <button 
                    onClick={() => setShowSolutionDetails(false)}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-white 
                             hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    Изменить выбор
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Thank You Screen */}
          {showThankYou && (
            <div className="text-center space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium backdrop-blur-sm mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Запрос отправлен
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Спасибо!
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ваш запрос отправлен. Мы проанализируем ваше цифровое древо и свяжемся с вами в ближайшее время.
              </p>
              
              <button 
                onClick={handleRestart}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white 
                         hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Создать новое древо
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
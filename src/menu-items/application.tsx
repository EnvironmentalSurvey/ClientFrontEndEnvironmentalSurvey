// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';
import QuizIcon from '@mui/icons-material/Quiz';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NewspaperIcon from '@mui/icons-material/Newspaper';
// icons
const icons = {
  widgets: Story,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart,
  FAQs: QuizIcon,
  support: SupportAgentIcon,
  news: NewspaperIcon
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const application: NavItemType = {
  id: 'group-widget',
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'Survey',
      title: <FormattedMessage id="survey" />,
      type: 'item',
      url: '/survey',
      icon: icons.news,
      breadcrumbs: false
    },
    {
      id: 'faqs',
      title: <FormattedMessage id="FAQs" />,
      type: 'item',
      url: '/faqs',
      icon: icons.FAQs,
      breadcrumbs: false
    },
    {
      id: 'support',
      title: <FormattedMessage id="Support" />,
      type: 'item',
      url: '/support',
      icon: icons.support,
      breadcrumbs: false
    }
  ]
};

export default application;

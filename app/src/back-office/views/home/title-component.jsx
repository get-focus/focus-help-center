import i18n from 'i18next';
import {Link} from 'react-router';

export function TitleComponent() {
    return <Link className='title' to='home'>{i18n.t('back-office.title')}</Link>;
}

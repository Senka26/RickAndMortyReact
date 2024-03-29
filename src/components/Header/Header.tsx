import { Button, Input } from "antd";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

interface HeaderProps {
  setSearchFilter: (value: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchFilter }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSearchFilter(value);
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <span className={styles.title}>{t('characterListTitle')}</span>
      <div className={styles.controls}>
        <Input
          type="text"
          placeholder={t('search')}
          value={searchValue as string}
          onChange={handleSearchChange}
        />
        <Button type="default" className={styles.button} onClick={logout}>
          {t('logout')}
        </Button>
      </div>
    </nav>
  );
}

export default Header;

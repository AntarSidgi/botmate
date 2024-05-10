'use client';

import ISO6391 from 'iso-639-1';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import { usePathname } from 'next/navigation';

import { locales } from '#/config';
import { useRouter } from '#/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function GeneralSettings() {
  const r = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="container flex flex-1 flex-col gap-2 overflow-auto py-4">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">
            {t('Settings.Appearance.Title')}
          </CardTitle>
          <CardDescription>
            {t('Settings.Appearance.Description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {t('Common.Coming soon')}!
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">
            {t('Settings.Language.Title')}
          </CardTitle>
          <CardDescription>
            {t('Settings.Language.Description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              {t('Settings.Language.Select')}
            </div>
            <div>
              <Select
                onValueChange={(l) => {
                  r.push(pathname, { locale: l });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={ISO6391.getName(
                      locale,
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Language
                    </SelectLabel>
                    {locales.map((l) => (
                      <SelectItem
                        key={l}
                        value={l}
                      >
                        {ISO6391.getName(l)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GeneralSettings;

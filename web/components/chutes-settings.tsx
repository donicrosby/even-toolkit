import * as React from 'react';
import { Input } from 'even-toolkit/web/input';
import { SettingsGroup } from 'even-toolkit/web/settings-group';
import { Button } from 'even-toolkit/web/button';
import { storageSet, storageGet } from 'even-toolkit/storage';

interface ChutesSettingsProps {
  className?: string;
}

const STORAGE_KEY = 'chutes_api_key';

export function ChutesSettings({ className }: ChutesSettingsProps) {
  const [apiKey, setApiKey] = React.useState('');

  React.useEffect(() => {
    storageGet<string>(STORAGE_KEY, '').then(loaded => {
      setApiKey(loaded);
    });
  }, []);

  const handleSave = () => {
    storageSet(STORAGE_KEY, apiKey);
  };

  const handleClear = () => {
    setApiKey('');
    storageSet(STORAGE_KEY, '');
  };

  return (
    <SettingsGroup label="Chutes API" className={className}>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <label className="block text-[13px] tracking-[-0.13px] text-text-dim mb-2">
            API Key
          </label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.currentTarget.value)}
            placeholder="cpk_..."
            className="w-full"
          />
        </div>
        <div className="px-3 flex gap-2">
          <Button size="sm" onClick={handleSave} disabled={!apiKey.trim()}>
            Save
          </Button>
          <Button size="sm" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </SettingsGroup>
  );
}

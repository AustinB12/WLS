import React from 'react';
import { List, ListItem, Skeleton } from '@mui/material';
import sb from '../../utils/supabase';
import type { Patron } from '../../types';
import { useEffect, useState, useCallback } from 'react';
import { ListViewCell } from '../../components/common/ListViewCell';

const PatronsList: React.FC = () => {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [loading, setLoading] = useState(true);

  const getPatrons = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('patrons')
        .select('id, first_name, last_name, balance, birthday');

      if (error) {
        return;
      }

      if (data) {
        setPatrons(
          data.map(
            (patron) =>
              ({
                id: patron.id,
                first_name: patron.first_name,
                last_name: patron.last_name,
                balance: patron.balance,
                birthday: patron?.birthday
                  ? new Date(patron.birthday + 'T06:00:00Z')
                  : null,
              }) as Patron
          )
        );
      }
    } catch {
      // Error handling can be added here
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPatrons();
  }, [getPatrons]);

  if (loading) {
    return <Skeleton variant="rectangular" height={'40vh'} />;
  }

  return (
    <List
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        py: 0,
      }}
    >
      {patrons.map((patron, index) => (
        <ListItem
          key={patron.id}
          sx={{
            borderBottom: index < patrons.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider',
            bgcolor: index % 2 === 0 ? 'background.paper' : '#1811d610',
          }}
        >
          <ListViewCell key={patron.id} patron={patron} />
        </ListItem>
      ))}
    </List>
  );
};
export default PatronsList;

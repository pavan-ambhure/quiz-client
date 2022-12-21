import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useStateContext from './../../hooks/useStateContext';
import { createAPIEndpoint, ENDPOINTS } from './../../api/index';
import { getFormatedTime } from './../../helper/index';
import { green } from '@mui/material/colors';
import Answer from './Answer';

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);

    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.questionId == x.qnId),
        }));

        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);

    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate('/quiz');
  };

  const submitScore = () => {
    console.log('submit');
    console.log(context);
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: 'flex',
          width: '100%',
          maxWidth: 640,
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant='h4'>Congratulations!</Typography>
            <Typography variant='h6'>YOUR SCORE</Typography>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
              <Typography variant='span' color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant='h6'>
              Took {getFormatedTime(context.timeTaken) + ' mins'}
            </Typography>
            <Button
              variant='contained'
              sx={{ mx: 1 }}
              size='small'
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant='contained'
              sx={{ mx: 1 }}
              size='small'
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity='success'
              variant='string'
              sx={{
                width: '60%',
                m: 'auto',
                visibility: showAlert ? 'visible' : 'hidden',
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia
          component='img'
          sx={{ width: 220 }}
          image='data:image/png;base64,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'
        />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  );
}

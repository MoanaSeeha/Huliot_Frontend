import { ChangeEvent, FC, useState } from 'react'
import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Navbar } from '@/components'
import { Translate } from '@components/Translate'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'hidden',
    },

    heading: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(22),
      fontWeight: 700,
    },

    paragraph: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: theme.typography.pxToRem(18),
    },

    link: {
      fontFamily: 'inherit',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(20),
      color: '#1BAC54',
      marginTop: theme.spacing(0.5),
    },
  }),
)

export const AboutUs: FC = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <Navbar />

      <div className={classes.root}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              <Translate id="AboutUs.Heading" defaultMessage="About the company" />
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography className={classes.paragraph}>
              <Translate
                id="AboutUs.Description"
                defaultMessage="Huliot was established in 1947 by the members of Kibbutz Sde Nehemia in Israel’s Upper
                  Galilee. Huliot, jointly owned by Kibbutz Sde Nehemia (50%) and the Tene Investment
                  Fund (50%), specializes in the manufacture and marketing of advanced flow systems for
                  water supply, wastewater, sewage, rainwater drainage for buildings and infrastructure
                  systems. Huliot’s products are sold in Israel and worldwide."
              />
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>
              <Translate id="AboutUs.AboutApp" defaultMessage="About the app" />
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box>
              <Typography className={classes.paragraph}>
                <b>App Version:</b> <i>{APP_VERSION}</i>
              </Typography>
              <Typography className={classes.paragraph}>
                <b>Build Date:</b> <i>{BUILD_DATE}</i>
              </Typography>

              <Link className={classes.link}>
                <Translate id="AboutUs.Link" defaultMessage="Show On boarding Screens" />
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>
              <Translate id="AboutUs.TermsOfUse" defaultMessage="Terms of Use & Conditions" />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.paragraph}>
              <Translate
                id="AboutUs.TermsOfUseParagraph"
                defaultMessage="Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                  eros, vitae egestas augue. Duis vel est augue."
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}

import { IconButton, Link, Stack, Tooltip } from '@mui/material'
import React from 'react'
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import HelpIcon from "@mui/icons-material/Help";

function Socials() {
  return (
    <Stack direction="row">
          <IconButton area-label="web">
            <Tooltip title="Web Site" followCursor={true} arrow>
              <Link href="https://nandurijv.codes" target="_blank">
                <LanguageSharpIcon
                  sx={{
                    fontSize: "3rem",
                    color: "gray",
                    "&:hover": { color: "white" },
                  }}
                />
              </Link>
            </Tooltip>
          </IconButton>
          <IconButton area-label="insta">
            <Tooltip title="Instagram" followCursor={true} arrow>
              <Link href="https://nandurijv.codes" target="_blank">
                <InstagramIcon
                  sx={{
                    fontSize: "3rem",
                    color: "gray",
                    "&:hover": { color: "white" },
                  }}
                />
              </Link>
            </Tooltip>
          </IconButton>
          <IconButton area-label="twitter">
            <Tooltip title="Twitter" followCursor={true} arrow>
              <Link href="https://nandurijv.codes" target="_blank">
                <TwitterIcon
                  sx={{
                    fontSize: "3rem",
                    color: "gray",
                    "&:hover": { color: "white" },
                  }}
                />
              </Link>
            </Tooltip>
          </IconButton>
          <IconButton area-label="help">
            <Tooltip title="HelpDesk" followCursor={true} arrow>
              <Link href="https://help.com" target="_blank">
                <HelpIcon
                  sx={{
                    fontSize: "3rem",
                    color: "gray",
                    "&:hover": { color: "white" },
                  }}
                />
              </Link>
            </Tooltip>
          </IconButton>
        </Stack>
  )
}

export default Socials
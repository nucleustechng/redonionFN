import React from "react";
import {
  Divider,
  IconButton,
  Link,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LinkIcon from "@mui/icons-material/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Styles
import styles from "./TableDetailsModal.module.css";
import Close from "@mui/icons-material/Close";

const TableDetailsModal = ({
  open,
  onClose,
  modalTitle,
  tableHeads,
  tableData,
  copied,
  handleOnCopy,
  viewOnBlockChain,
}) => {
  const theme = useTheme();

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={onClose}
    >
      <Box
        bgcolor={theme.palette.background.paper}
        className={styles.modalBody}
      >
        <Box className={styles.modalContent}>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="primary" variant="subtitle1">
              {modalTitle}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          <Box mt={2} px={1} className={styles.tableDataBox}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="column" spacing={2}>
                {tableHeads.map((th) => (
                  <Typography
                    key={th.id}
                    color="text.secondary"
                    variant="body1"
                  >
                    {th?.name}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="column" spacing={2} sx={{ textAlign: "right" }}>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.asset}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.transactionAmount}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <Typography variant="body1" component="span">
                    {tableData[0]?.transactionAddress?.slice(0, 10)}...
                  </Typography>{" "}
                  <CopyToClipboard
                    text={tableData[0]?.transactionAddress}
                    onCopy={handleOnCopy}
                  >
                    <IconButton size="small">
                      {copied ? (
                        <CheckBoxIcon color="success" />
                      ) : (
                        <ContentCopyIcon color="secondary" />
                      )}
                    </IconButton>
                  </CopyToClipboard>
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.transactionTimeStamp}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              mt={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" color="text.secondary">
                View On Blockchain
              </Typography>
              <Typography>
                <IconButton>
                  <Link
                    target="_blank"
                    href="https://www.blockchain.com/explorer"
                  >
                    <LinkIcon color="accent" />
                  </Link>
                </IconButton>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TableDetailsModal;

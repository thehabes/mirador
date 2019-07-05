import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import RootRef from '@material-ui/core/RootRef';
import Select from '@material-ui/core/Select';
import { ScrollTo } from './ScrollTo';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CompanionWindow from '../containers/CompanionWindow';
import SidebarIndexCompact from '../containers/SidebarIndexCompact';
import SidebarIndexThumbnail from '../containers/SidebarIndexThumbnail';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleVariantChange = this.handleVariantChange.bind(this);

    this.state = {
      variantSelectionOpened: false,
    };

    this.containerRef = React.createRef();
  }

  /** @private */
  getIdAndLabelOfCanvases() {
    const { canvases } = this.props;

    return canvases.map((canvas, index) => ({
      id: canvas.id,
      label: new ManifestoCanvas(canvas).getLabel(),
    }));
  }

  /** @private */
  handleVariantChange(event) {
    const { updateVariant } = this.props;

    updateVariant(event.target.value);
    this.setState({ variantSelectionOpened: false });
  }

  /**
   * render
   */
  render() {
    const {
      canvases,
      classes,
      id,
      selectedCanvases,
      setCanvas,
      t,
      toggleDraggingEnabled,
      variant,
      windowId,
    } = this.props;

    const { variantSelectionOpened } = this.state;
    const canvasesIdAndLabel = this.getIdAndLabelOfCanvases(canvases);
    return (
      <RootRef rootRef={this.containerRef}>
        <CompanionWindow
          title={t('canvasIndex')}
          id={id}
          windowId={windowId}
          titleControls={(
            <FormControl>
              <Select
                MenuProps={{
                  anchorOrigin: {
                    horizontal: 'left',
                    vertical: 'bottom',
                  },
                  getContentAnchorEl: null,
                }}
                displayEmpty
                value={variant}
                onChange={this.handleVariantChange}
                name="variant"
                open={variantSelectionOpened}
                onOpen={(e) => {
                  toggleDraggingEnabled();
                  this.setState({ variantSelectionOpened: true });
                }}
                onClose={(e) => {
                  toggleDraggingEnabled();
                  this.setState({ variantSelectionOpened: false });
                }}
                classes={{ select: classes.select }}
                className={classes.selectEmpty}
              >
                <MenuItem value="compact"><Typography variant="body2">{ t('compactList') }</Typography></MenuItem>
                <MenuItem value="thumbnail"><Typography variant="body2">{ t('thumbnailList') }</Typography></MenuItem>
              </Select>
            </FormControl>
          )}
        >
          <List>
            {
              canvasesIdAndLabel.map((canvas, canvasIndex) => {
                const onClick = () => { setCanvas(windowId, canvas.id); }; // eslint-disable-line require-jsdoc, max-len

                return (
                  <ScrollTo
                    containerRef={this.containerRef}
                    key={`${canvas.id}-${variant}`}
                    offsetTop={96} // offset for the height of the form above
                    scrollTo={!!selectedCanvases.find(c => c.id === canvas.id)}
                  >
                    <ListItem
                      key={canvas.id}
                      className={classes.listItem}
                      alignItems="flex-start"
                      onClick={onClick}
                      button
                      component="li"
                      selected={!!selectedCanvases.find(c => c.id === canvas.id)}
                    >
                      {variant === 'compact' && <SidebarIndexCompact canvas={canvas} />}
                      {variant === 'thumbnail' && <SidebarIndexThumbnail canvas={canvas} otherCanvas={canvases[canvasIndex]} />}
                    </ListItem>
                  </ScrollTo>
                );
              })
            }
          </List>
        </CompanionWindow>
      </RootRef>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  selectedCanvases: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleDraggingEnabled: PropTypes.func.isRequired,
  updateVariant: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['compact', 'thumbnail']),
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCanvasPanel.defaultProps = {
  selectedCanvases: [],
  variant: 'thumbnail',
};

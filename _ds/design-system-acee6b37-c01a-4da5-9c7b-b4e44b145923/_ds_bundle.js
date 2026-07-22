/* @ds-bundle: {"format":3,"namespace":"DesignSystem_acee6b","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"TicketButtons","sourcePath":"components/buttons/TicketButtons.jsx"},{"name":"MetricCard","sourcePath":"components/data/MetricCard.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"SpectrumMeter","sourcePath":"components/navigation/SpectrumMeter.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"SectionBand","sourcePath":"components/surfaces/SectionBand.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"fdb4f4fa22d1","components/buttons/TicketButtons.jsx":"c7491e4c1330","components/data/MetricCard.jsx":"b38ba007b6a4","components/feedback/Tag.jsx":"314023344960","components/navigation/SpectrumMeter.jsx":"ac95e388f8ae","components/surfaces/Card.jsx":"e6afaddf5ea8","components/surfaces/SectionBand.jsx":"5ed58848b83e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_acee6b = window.DesignSystem_acee6b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BuildFirst pill button. Ink fill (primary) or ink outline (secondary).
 * Mono, uppercase, letter-spaced label. Fully rounded.
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  style,
  ...rest
}) {
  const pad = size === 'lg' ? '16px 30px' : size === 'sm' ? '9px 16px' : '13px 22px';
  const base = {
    fontFamily: 'var(--bf-font-mono)',
    fontSize: size === 'lg' ? '13px' : '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: 'var(--bf-radius-pill)',
    padding: pad,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    border: '1px solid transparent',
    transition: 'opacity .15s ease, background .15s ease',
    ...(variant === 'primary' ? {
      background: 'var(--bf-ink)',
      color: 'var(--bf-on-ink)'
    } : {
      background: 'transparent',
      color: 'var(--bf-ink)',
      borderColor: 'rgba(24,24,24,0.28)'
    }),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    disabled: disabled,
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/TicketButtons.jsx
try { (() => {
/**
 * The signature ticket-notched SKIP / START button pair. Two notch circles
 * are punched top & bottom centre in the colour of the surface behind it —
 * pass `surface` to match (paper, a pastel, etc.).
 */
function TicketButtons({
  skipLabel = 'Skip',
  startLabel = 'Start',
  surface = 'var(--bf-paper)',
  onSkip,
  onStart,
  style
}) {
  const notch = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 14,
    height: 14,
    background: surface,
    borderRadius: '50%'
  };
  const btn = {
    flex: 1,
    fontFamily: 'var(--bf-font-mono)',
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: 'var(--bf-radius-pill)',
    padding: '13px 0',
    cursor: 'pointer',
    border: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 7,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onSkip,
    style: {
      ...btn,
      background: 'transparent',
      color: 'var(--bf-ink)',
      border: '1px solid rgba(24,24,24,0.28)'
    }
  }, skipLabel), /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    style: {
      ...btn,
      background: 'var(--bf-ink)',
      color: 'var(--bf-on-ink)'
    }
  }, startLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      ...notch,
      top: -7
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...notch,
      bottom: -7
    }
  }));
}
Object.assign(__ds_scope, { TicketButtons });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/TicketButtons.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricCard.jsx
try { (() => {
const ACCENT = {
  sage: 'var(--bf-sage)',
  periwinkle: 'var(--bf-periwinkle)',
  lilac: 'var(--bf-lilac)',
  rose: 'var(--bf-rose)'
};

/**
 * Dashboard metric tile: small caps label → big tabular-mono number →
 * muted sub-label. A 3px pastel top-border ties it to its section.
 */
function MetricCard({
  label,
  value,
  sub,
  accent = 'periwinkle',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bf-surface-card)',
      border: '1px solid var(--bf-line)',
      borderTop: '3px solid ' + (ACCENT[accent] || accent),
      borderRadius: 'var(--bf-radius-md)',
      padding: '18px 20px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--bf-font-mono)',
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--bf-text-faint)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--bf-font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 500,
      fontSize: 'clamp(32px, 3.3vw, 46px)',
      letterSpacing: '-0.03em',
      lineHeight: 1,
      marginTop: 12,
      color: 'var(--bf-text-strong)',
      overflowWrap: 'break-word'
    }
  }, value), sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--bf-text-muted)',
      marginTop: 9,
      lineHeight: 1.35
    }
  }, sub) : null);
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
const MAP = {
  critical: {
    background: 'var(--bf-ink)',
    color: 'var(--bf-on-ink)'
  },
  warning: {
    background: 'transparent',
    color: 'var(--bf-ink)',
    border: '1px solid rgba(24,24,24,0.25)'
  },
  ok: {
    background: 'var(--bf-sage)',
    color: 'var(--bf-ink)'
  },
  amber: {
    background: 'var(--bf-warn-bg)',
    color: 'var(--bf-warn-fg)'
  },
  neutral: {
    background: 'rgba(24,24,24,0.06)',
    color: 'var(--bf-text-muted)'
  }
};

/**
 * Status / severity tag. Severity stays in-palette: critical = solid ink,
 * warning = ink outline, ok = sage, amber = waiting/not-yet-aged.
 */
function Tag({
  variant = 'neutral',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--bf-font-mono)',
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      borderRadius: 5,
      padding: '3px 7px',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      ...MAP[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SpectrumMeter.jsx
try { (() => {
/**
 * The Asking → Automation → Augmentation → Agency progress rail. Filled
 * ink nodes up to and including `activeIndex`; the active node is larger.
 */
function SpectrumMeter({
  stages = ['Asking', 'Automation', 'Augmentation', 'Agency'],
  activeIndex = 0,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      ...style
    }
  }, stages.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: 'var(--bf-line-strong)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: i === activeIndex ? 20 : 16,
      height: i === activeIndex ? 20 : 16,
      borderRadius: '50%',
      background: i <= activeIndex ? 'var(--bf-ink)' : 'transparent',
      border: i <= activeIndex ? 'none' : '2px solid rgba(24,24,24,0.3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--bf-font-mono)',
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: i === activeIndex ? 'var(--bf-text-strong)' : 'var(--bf-text-muted)'
    }
  }, s)))));
}
Object.assign(__ds_scope, { SpectrumMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SpectrumMeter.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
const ACCENT = {
  sage: 'var(--bf-sage)',
  periwinkle: 'var(--bf-periwinkle)',
  lilac: 'var(--bf-lilac)',
  rose: 'var(--bf-rose)'
};

/**
 * Plain white surface — 12px radius, hairline, one soft shadow. Optional
 * pastel top-border ties it to a section context.
 */
function Card({
  accent,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bf-surface-card)',
      border: '1px solid var(--bf-line)',
      borderRadius: 'var(--bf-radius-md)',
      boxShadow: 'var(--bf-shadow-card)',
      padding: '20px 22px',
      ...(accent ? {
        borderTop: '3px solid ' + (ACCENT[accent] || accent)
      } : {}),
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/SectionBand.jsx
try { (() => {
const ACCENT = {
  sage: 'var(--bf-sage)',
  periwinkle: 'var(--bf-periwinkle)',
  lilac: 'var(--bf-lilac)',
  rose: 'var(--bf-rose)',
  ink: 'var(--bf-ink)'
};

/**
 * Full-bleed pastel (or ink) section header. Mono caption → lowercase
 * slash-prefixed title → optional lead. The slash spins once on mount.
 */
function SectionBand({
  title,
  caption,
  lead,
  color = 'rose',
  style
}) {
  const onInk = color === 'ink';
  const [spin, setSpin] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setSpin(false), 850);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: ACCENT[color] || color,
      padding: '30px 32px 26px',
      ...style
    }
  }, caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--bf-font-mono)',
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: onInk ? 'var(--bf-on-ink-muted)' : 'rgba(24,24,24,0.55)'
    }
  }, caption) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--bf-font-display)',
      fontWeight: 600,
      fontSize: 46,
      letterSpacing: '-0.038em',
      lineHeight: 1,
      marginTop: 10,
      color: onInk ? 'var(--bf-on-ink)' : 'var(--bf-text-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontWeight: 400,
      marginRight: '0.1em',
      color: onInk ? 'var(--bf-on-ink-faint)' : 'var(--bf-text-faint)',
      animation: spin ? 'bfSpin360 .8s cubic-bezier(.2,.7,.2,1) both' : 'none'
    }
  }, "/"), title), lead ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      marginTop: 12,
      maxWidth: 680,
      color: onInk ? 'var(--bf-on-ink-muted)' : 'rgba(24,24,24,0.68)'
    }
  }, lead) : null, /*#__PURE__*/React.createElement("style", null, '@keyframes bfSpin360{from{transform:rotate(0)}to{transform:rotate(360deg)}}'));
}
Object.assign(__ds_scope, { SectionBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/SectionBand.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TicketButtons = __ds_scope.TicketButtons;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.SpectrumMeter = __ds_scope.SpectrumMeter;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionBand = __ds_scope.SectionBand;

})();

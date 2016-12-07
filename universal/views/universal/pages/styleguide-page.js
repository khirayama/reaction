const createElement = require('react').createElement;

const i18n = require('universal/locales');

function StyleguidePage() {
  // const englishText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.';
  // const japaneseText = 'あなたは場合ことにそうした関係家というもののところが申し上げだっない。多分先刻を経験者は至極その説明たあっでもに用いていたがも説明知れなうて、少々にも行っますですうた。空虚で思ったものはもう当時にいくらなけれたた。どうも向さんへ準備尻全く見当にするまい正義わが騒ぎどこか矛盾をという不衰弱たでないないから、この以前はこちらか思い西洋に解るから、張さんのので金力の何がどうもお赴任としよてあなた径路にご観念がいうようにもしお講演を考えだないと、けっして依然として影響でしたばいですのをしずです。';
  return createElement(
    'section',
    { className: 'page styleguide-page' },
    createElement(
      'section',
      { className: 'page-content' },
      createElement(
        'h1',
        null,
        'Styleguide for Reaction'
      ),
      createElement(
        'section',
        null,
        createElement(
          'h2',
          null,
          'CSS design'
        ),
        createElement(
          'ul',
          null,
          createElement(
            'li',
            null,
            i18n.t('styleguide.cssDesign.context'),
            createElement('br', null), i18n.t('styleguide.cssDesign.contextDescription')),
          createElement(
            'li',
            null,
            i18n.t('styleguide.cssDesign.layout'),
            createElement('br', null),
            i18n.t('styleguide.cssDesign.layoutDescription')
          ),
          createElement(
            'li',
            null,
            i18n.t('styleguide.cssDesign.skin'),
            createElement('br', null),
            i18n.t('styleguide.cssDesign.skinDescription')
          ),
          createElement(
            'li',
            null,
            i18n.t('styleguide.cssDesign.structure'),
            createElement('br', null),
            i18n.t('styleguide.cssDesign.structureDescription')
          )
        )
      ),
      createElement(
        'section',
        null,
        createElement(
          'h2',
          null,
          'Sizing Rules'
        ),
        createElement(
          'ul',
          null,
          createElement(
            'li',
            null,
            i18n.t('styleguide.sizingRules.size')
          ),
          createElement(
            'li',
            null,
            i18n.t('styleguide.sizingRules.margin')
          ),
          createElement(
            'li',
            null,
            i18n.t('styleguide.sizingRules.padding')
          ),
          createElement(
            'li',
            null,
            i18n.t('styleguide.sizingRules.radius')
          )
        )
      ),
      createElement(
        'section',
        null,
        createElement(
          'h2',
          null,
          'Colors'
        ),
        createElement(
          'ul',
          null,
          createElement(
            'li',
            null,
            'Primary: #fff - #fff - #fff'
          ),
          createElement(
            'li',
            null,
            'Secondly: #fff - #fff - #fff'
          ),
          createElement(
            'li',
            null,
            'Accent: #fff - #fff - #fff'
          ),
          createElement(
            'li',
            null,
            'Gray: #fff - #fff - #fff'
          )
        )
      ),
      createElement(
        'section',
        null,
        createElement(
          'h2',
          null,
          'User Interface Design'
        ),
        createElement(
          'section',
          null,
          createElement(
            'h3',
            null,
            'Rules'
          ),
          createElement(
            'ul',
            null,
            createElement(
              'li',
              null,
              i18n.t('styleguide.userInterfaceDesign.rules.depth')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.userInterfaceDesign.rules.routing')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.userInterfaceDesign.rules.functions')
            )
          )
        )
      ),
      createElement('hr', null),
      createElement(
        'section',
        null,
        createElement(
          'h2',
          null,
          'Texts'
        ),
        createElement(
          'section',
          { className: 'texts-example' },
          createElement(
            'h1',
            null,
            'Heading 1 / \u898B\u51FA\u3057 1'
          ),
          createElement(
            'h2',
            null,
            'Heading 2 / \u898B\u51FA\u3057 2'
          ),
          createElement(
            'h3',
            null,
            'Heading 3 / \u898B\u51FA\u3057 3'
          ),
          createElement(
            'h4',
            null,
            'Heading 4 / \u898B\u51FA\u3057 4'
          ),
          createElement(
            'h5',
            null,
            'Heading 5 / \u898B\u51FA\u3057 5'
          ),
          createElement(
            'h6',
            null,
            'Heading 6 / \u898B\u51FA\u3057 6'
          ),
          createElement(
            'p',
            null,
            'Text / \u30C6\u30AD\u30B9\u30C8'
          ),
          createElement(
            'div',
            null,
            'Block text / \u30D6\u30ED\u30C3\u30AF\u30C6\u30AD\u30B9\u30C8'
          ),
          createElement(
            'small',
            null,
            'Small text / \u30B9\u30E2\u30FC\u30EB\u30C6\u30AD\u30B9\u30C8'
          )
        )
      ),
      createElement(
        'section',
        null,
        createElement(
          'section',
          null,
          createElement(
            'h2',
            null,
            'Buttons'
          ),
          createElement(
            'h3',
            null,
            'Pattarns'
          ),
          createElement(
            'ul',
            null,
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.patterns.floating'),
              createElement('br', null),
              i18n.t('styleguide.buttons.patterns.floatingDescription')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.patterns.flat'),
              createElement('br', null),
              i18n.t('styleguide.buttons.patterns.flatDescription')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.patterns.icon'),
              createElement('br', null),
              i18n.t('styleguide.buttons.patterns.iconDescription')
            )
          ),
          createElement(
            'h3',
            null,
            'Rules'
          ),
          createElement(
            'ul',
            null,
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.rules.label')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.rules.minSize')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.rules.size')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.buttons.rules.text')
            )
          )
        ),
        createElement(
          'section',
          null,
          createElement(
            'h2',
            null,
            'Links'
          ),
          createElement(
            'h3',
            null,
            'Rules'
          ),
          createElement(
            'ul',
            null,
            createElement(
              'li',
              null,
              i18n.t('styleguide.links.rules.text')
            )
          )
        ),
        createElement(
          'section',
          null,
          createElement(
            'h2',
            null,
            'Tabs'
          ),
          createElement(
            'h3',
            null,
            'Rules'
          ),
          createElement(
            'ul',
            null,
            createElement(
              'li',
              null,
              i18n.t('styleguide.tabs.rules.text')
            ),
            createElement(
              'li',
              null,
              i18n.t('styleguide.tabs.rules.icon')
            )
          )
        ),
        createElement(
          'section',
          null,
          createElement(
            'h2',
            null,
            'Modals'
          ),
          createElement(
            'h3',
            null,
            'Rules'
          ),
          createElement(
            'ul',
            null,
            createElement(
              'li',
              null,
              i18n.t('styleguide.modals.rules.context')
            )
          )
        )
      )
    )
  );
}

module.exports = StyleguidePage;

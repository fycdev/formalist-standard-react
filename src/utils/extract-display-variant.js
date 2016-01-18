/**
 * Extract matching display variant (by key) from the list of passed
 * variants
 * @param  {String} variant String matching a display variant
 *
 * @param  {Object} variants Set of React classes attached to named keys
 * matching the passed `variant`
 *
 * @param  {String} type Field type of the variant parent (string, int, bool, etc)
 *
 * @return {React} The display component found
 */
export default function extractDisplayVariants (variant, variants, type) {
  variant = variant || 'default'
  let component = variants[variant]
  if (component == null) {
    throw new Error(`Component for the '${type}:${variant}' display variant is invalid.`)
  }
  return component
}